#!/bin/bash

if [ -f .env ]; then 
    source .env
fi


if [ "$ENVIRONMENT" = "production" ]; then
    export CLIENT_DOCKERFILE=Dockerfile.prod
    echo "Environment is production. Using Dockerfile.prod for React Client."
else
    export CLIENT_DOCKERFILE=Dockerfile
    echo "Environment is development. Using Dockerfile for React Client."
fi

docker compose up --build

