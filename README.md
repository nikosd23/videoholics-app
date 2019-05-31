# videoholics app web service

A web service for converting audio files with ffmpeg

Node.js, Express, FFMPEG, Docker

## API

`POST /mp3` - Convert audio file in request body to mp3 and return result for download

`POST /m4a` - Convert audio file in request body to mp3 and return result for download

`GET /`, `GET /readme` - Web Service Readme

### POST /mp3, POST /m4a

Curl Ex:

```bash
curl --request POST --data-binary "@file.wav" 127.0.0.1:3000/mp3 -o file.mp3
```

## Installation

Requires local Node and FFMPEG installation.

1. Install FFMPEG https://ffmpeg.org/download.html

2. Install node https://nodejs.org/en/download/
   Using homebrew:

```bash
$ brew install node
```

## Running Service Locally

Navigate to project directory and:

Install dependencies:

```bash
$ npm install
```

Start app:

```bash
$ node app.js
```

## Running Service in a Docker Container Locally

Requires Docker

Install Docker

```
https://www.docker.com
```

Build Docker Image from Dockerfile with a set image tag. ex: bm/ffmpeg

```bash
$ docker build -t <image>/<tag> .
```

Launch Docker Container from Docker Image, exposing port 49160

```bash
$ docker run -p 49160:3000 -d '<image>'/'<tag>'
```

### Developing Service In Running Container via Docker-Compose

```bash
docker-compose up -d --build

docker ps # note <CONTAINER ID>

# enter bash prompt for docker container
docker exec -it <CONTAINER ID> /bin/bash

vi README.md # edit file in vi, ex. README.md
```

Clone this repo

```bash
# git clone https://github.com/nikosd23/videoholics-app.git
```

```bash
# cd videoholics-app
```

Build Docker Image from Dockerfile with a set image tag. ex: bm/ffmpeg

```bash
# docker build -t <image>/<tag> .
```

Launch Docker Container from Docker Image, exposing port 49160

```bash
# docker run -p 3000:3000 -d '<image>'/'<tag>'
```