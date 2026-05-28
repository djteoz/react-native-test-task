#!/bin/bash
set -euo pipefail

PACKAGE="com.saferegiontesttask"
ACTIVITY="${PACKAGE}/.MainActivity"
APK="android/app/build/outputs/apk/debug/app-debug.apk"

launch_app() {
  adb shell am force-stop "$PACKAGE" >/dev/null 2>&1 || true
  adb shell input keyevent KEYCODE_BACK >/dev/null 2>&1 || true
  adb shell am start -W -n "$ACTIVITY" >/dev/null
  sleep 8
}

echo "=== Waiting for device ==="
adb wait-for-device
adb shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done'
sleep 10

echo "=== Installing prebuilt APK ==="
if [[ ! -f "$APK" ]]; then
  echo "Missing APK at $APK"
  exit 1
fi
adb install -r "$APK"

echo "=== Preparing emulator ==="
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
adb shell input keyevent KEYCODE_WAKEUP >/dev/null 2>&1 || true
sleep 2

echo "=== Launching app before recording ==="
launch_app
launch_app

FOCUS=$(adb shell dumpsys window 2>/dev/null | grep -E 'mCurrentFocus|mFocusedApp' | head -1 || true)
echo "Window focus: ${FOCUS}"

echo "=== Starting screen recording ==="
adb shell screenrecord --time-limit 24 /data/local/tmp/testscreen.mp4 &
RECORD_JOB=$!
sleep 2

launch_app

echo "=== Scrolling through TestScreen ==="
for _ in 1 2 3 4 5; do
  adb shell input swipe 540 1800 540 500 700
  sleep 1.4
done

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
