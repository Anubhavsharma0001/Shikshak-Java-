#!/usr/bin/env sh
# Build (if needed) and start Shikshak Java. Needs only JDK 17+ (no Maven, no Node).
set -e
cd "$(dirname "$0")"
if [ ! -f build/shikshak-java.jar ]; then
  mkdir -p build/classes
  javac --release 17 -encoding UTF-8 -d build/classes src/main/java/shikshak/*.java
  printf 'Main-Class: shikshak.App\n' > build/manifest.txt
  jar cfm build/shikshak-java.jar build/manifest.txt -C build/classes .
fi
exec java -jar build/shikshak-java.jar
