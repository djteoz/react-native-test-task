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
adb shell screenrecord --time-limit 45 /data/local/tmp/testscreen.mp4 &
RECORD_PID=$!
sleep 2

echo "=== Launching app ==="
adb shell am force-stop com.saferegiontesttask || true
adb shell am start -n com.saferegiontesttask/.MainActivity
sleep 5

echo "=== Scrolling through TestScreen ==="
for _ in 1 2 3 4; do
  adb shell input swipe 400 1200 400 400 600
  sleep 1.5
done

sleep 2
echo "=== Stopping screen recording ==="
kill -INT "$RECORD_PID" 2>/dev/null || adb shell pkill -INT screenrecord || true
sleep 3

adb pull /data/local/tmp/testscreen.mp4 ./testscreen-recording.mp4
ls -lh ./testscreen-recording.mp4
