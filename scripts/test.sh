#!/usr/bin/env bash
yarn test:unit&
export APP_PID=$!
echo $APP_PID
pkill -15 $APP_PID
