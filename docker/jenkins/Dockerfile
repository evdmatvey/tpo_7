FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y \
        docker.io \
        python3 \
        python3-pip \
        nodejs \
        npm \
        curl \
        wget \
        git \
        unzip \
        chromium \
        chromium-driver && \
    ln -s /usr/bin/chromium /usr/bin/google-chrome && \
    ln -s /usr/bin/chromedriver /usr/local/bin/chromedriver && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
