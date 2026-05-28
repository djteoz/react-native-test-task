#!/bin/bash
set -euo pipefail

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

echo "=== Starting screen recording ==="
adb shell screenrecord --time-limit 22 /data/local/tmp/testscreen.mp4 &
RECORD_JOB=$!
sleep 2

echo "=== Launching app ==="
adb shell am force-stop com.saferegiontesttask || true
adb shell am start -n com.saferegiontesttask/.MainActivity
sleep 4

echo "=== Scrolling through TestScreen ==="
for _ in 1 2 3 4; do
  adb shell input swipe 400 1200 400 400 600
  sleep 1.2
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
ffprobe -hide_banner ./testscreen-recording.mp4 2>&1 | head -20
