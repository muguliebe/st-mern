#!/bin/bash

# Set environment variables from .env and set NODE_ENV to test
source <(dotenv-export | sed 's/\\n/\n/g')
export NODE_ENV=test
SERVER_PORT_TEST=3001
echo "$SERVER_PORT_TEST\r"

echo -ne '  5% [##                                      ] starting                                  \r'
echo -ne ' 60% [########################                ] Initiating API                            \r'
#yarn run serve &
yarn run serve > /dev/null &


# Polling to see if the server is up and running yet
SERVER_UP=false
TRIES=0
RETRY_LIMIT=50
RETRY_INTERVAL=0.4
while [ $TRIES -lt $RETRY_LIMIT ]; do
#  if netstat -tulpn 2>/dev/null | grep -q ":$SERVER_PORT_TEST.*LISTEN"; then
  if netstat -an| grep -q "$SERVER_PORT_TEST.*LISTEN"; then
    SERVER_UP=true
    break
  else
    sleep $RETRY_INTERVAL
    let TRIES=TRIES+1
  fi
done

# Only run this if API server is operational
if $SERVER_UP; then
  echo -ne ' 75% [##############################          ] API Initiated                             \r'
  # Run the test in the background
  echo -ne ' 80% [################################        ] Running E2E Tests                         \r'
  npx dotenv cucumber-js -- spec/features

#   Waits for the next job to terminate - this should be the tests
#  wait -n
#  sleep 5
fi

echo -ne ' 98% [####################################### ] Tests Complete                            \r'
echo '100% [########################################] Complete                                    '

# Terminate all processes within the same process group by sending a SIGTERM signal
set +e
kill -15 0
exit 0
