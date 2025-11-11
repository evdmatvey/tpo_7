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
        git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
