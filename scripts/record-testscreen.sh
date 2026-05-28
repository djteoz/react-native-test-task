#!/bin/bash
set -euo pipefail

PACKAGE="com.saferegiontesttask"
ACTIVITY="${PACKAGE}/.MainActivity"

ensure_app_foreground() {
  local attempt=1
  local max_attempts=8

  while [ "$attempt" -le "$max_attempts" ]; do
    echo "=== Ensuring app is foreground (attempt ${attempt}/${max_attempts}) ==="

    adb shell input keyevent KEYCODE_BACK >/dev/null 2>&1 || true
    adb shell input tap 540 1450 >/dev/null 2>&1 || true
    sleep 1

    adb shell am force-stop "$PACKAGE" >/dev/null 2>&1 || true
    adb shell am start -W -n "$ACTIVITY" >/dev/null
    sleep 6

    FOCUS=$(adb shell dumpsys window 2>/dev/null | grep -E 'mCurrentFocus|mFocusedApp' | head -1 || true)
    echo "Window focus: ${FOCUS}"

    if echo "$FOCUS" | grep -q "$PACKAGE"; then
      echo "App is in foreground"
      return 0
    fi

    attempt=$((attempt + 1))
    sleep 2
  done

  echo "Failed to bring app to foreground"
  adb shell screencap -p /data/local/tmp/debug.png || true
  adb pull /data/local/tmp/debug.png ./debug-emulator.png || true
  return 1
}

echo "=== Bundling JS for Android ==="
mkdir -p android/app/src/main/assets
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

echo "=== Building and installing APK ==="
cd android
./gradlew app:assembleDebug app:installDebug -PreactNativeArchitectures=x86_64 --no-daemon
cd ..

echo "=== Waiting for device ==="
adb wait-for-device
adb shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done'
sleep 15

echo "=== Preparing emulator ==="
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
adb shell input keyevent KEYCODE_WAKEUP >/dev/null 2>&1 || true
adb shell input keyevent KEYCODE_HOME >/dev/null 2>&1 || true
sleep 2

ensure_app_foreground
sleep 2

echo "=== Starting screen recording ==="
adb shell screenrecord --time-limit 24 /data/local/tmp/testscreen.mp4 &
RECORD_JOB=$!
sleep 1

ensure_app_foreground

echo "=== Scrolling through TestScreen ==="
for _ in 1 2 3 4 5; do
  adb shell input swipe 540 1800 540 500 700
  sleep 1.4
done

sleep 2
echo "=== Waiting for screenrecord to finish ==="
wait "$RECORD_JOB" || true
sleep 2

adb pull /data/local/tmp/testscreen.mp4 ./testscreen-recording-raw.mp4
ls -lh ./testscreen-recording-raw.mp4

echo "=== Re-encoding MP4 for Windows/browser compatibility ==="
ffmpeg -y -i ./testscreen-recording-raw.mp4 \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  ./testscreen-recording.mp4

ls -lh ./testscreen-recording.mp4
ffprobe -hide_banner ./testscreen-recording.mp4 2>&1 | head -20
