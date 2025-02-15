#!/bin/bash

# Start MongoDB container
docker run --name mongodb -d -p 27017:27017 mongo:latest

# You can add additional MongoDB commands here if needed.