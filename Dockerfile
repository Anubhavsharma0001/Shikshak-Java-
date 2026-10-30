# The full JDK is needed at runtime because the Run button calls javac.
FROM eclipse-temurin:17-jdk
RUN useradd -m -u 10001 app
WORKDIR /app
COPY --chown=app:app . .
RUN mkdir -p build/classes \
 && javac --release 17 -encoding UTF-8 -d build/classes src/main/java/shikshak/*.java \
 && printf 'Main-Class: shikshak.App\n' > build/manifest.txt \
 && jar cfm build/shikshak-java.jar build/manifest.txt -C build/classes . \
 && chown -R app:app build
USER app
ENV PORT=3000
EXPOSE 3000
CMD ["java", "-Xmx256m", "-jar", "build/shikshak-java.jar"]
