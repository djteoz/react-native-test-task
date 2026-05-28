#!/bin/bash
set -euo pipefail

PACKAGE="com.saferegiontesttask"
ACTIVITY="${PACKAGE}/.MainActivity"

launch_app() {
  adb shell am force-stop "$PACKAGE" >/dev/null 2>&1 || true
  adb shell input keyevent KEYCODE_BACK >/dev/null 2>&1 || true
  adb shell input tap 540 1450 >/dev/null 2>&1 || true
  adb shell am start -W -S -n "$ACTIVITY" >/dev/null
  sleep 7
}

capture_frame() {
  local index="$1"
  adb shell screencap -p "/sdcard/frame_${index}.png"
  adb pull "/sdcard/frame_${index}.png" "frames/frame_$(printf '%02d' "$index").png" >/dev/null
}

echo "=== Bundling JS for Android ==="
mkdir -p android/app/src/main/assets frames
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
sleep 2

echo "=== Launching app ==="
launch_app
launch_app

FOCUS=$(adb shell dumpsys window 2>/dev/null | grep -E 'mCurrentFocus|mFocusedApp' | head -1 || true)
echo "Window focus: ${FOCUS}"

echo "=== Capturing TestScreen frames ==="
capture_frame 1
sleep 1

for index in 2 3 4 5 6 7 8; do
  adb shell input swipe 540 1800 540 500 700
  sleep 1.6
  capture_frame "$index"
done

echo "=== Building MP4 from screenshots ==="
ffmpeg -y \
  -framerate 1 \
  -i frames/frame_%02d.png \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  ./testscreen-recording.mp4

ls -lh ./testscreen-recording.mp4
ffprobe -hide_banner ./testscreen-recording.mp4 2>&1 | head -20
