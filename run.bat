@echo off
cd /d "%~dp0"
if not exist build\shikshak-java.jar (
  mkdir build\classes
  javac --release 17 -encoding UTF-8 -d build\classes src\main\java\shikshak\*.java || exit /b 1
  echo Main-Class: shikshak.App> build\manifest.txt
  jar cfm build\shikshak-java.jar build\manifest.txt -C build\classes . || exit /b 1
)
java -jar build\shikshak-java.jar
