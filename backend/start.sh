#!/bin/sh

echo "Running Prisma Generate..."
npx prisma generate

echo "Starting Server with Nodemon..."
nodemon src/server.js
