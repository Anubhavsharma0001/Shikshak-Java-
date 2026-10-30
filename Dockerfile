FROM node:22-bookworm-slim

# Java compiler (JDK) for the Run button
RUN apt-get update \
 && apt-get install -y --no-install-recommends default-jdk-headless \
 && rm -rf /var/lib/apt/lists/*

# Run as a normal user, not root
RUN useradd -m -u 10001 app
WORKDIR /app
COPY --chown=app:app . .
USER app

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
