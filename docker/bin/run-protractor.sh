#!/bin/bash

if [ -n "$MANUAL" ]; then
  # if manual mode is enabled, just coast making supervisord happy
  while true; do
    sleep 60
  done
fi

echo "Waiting for Selenium..."
sleep 10

# check if Selenium server is listening @ port 4444
if nc -z localhost 4444; then
  # install node modules needed by the tests 	
  if [ -f package.json ]; then
  	  npm install
  fi

  # run protractor tests
  if [ -n "$NAME" ]; then
    protractor --suite $NAME
  else
    protractor
  fi

  # shutdown supervisord, and in consequence the whole container
  supervisorctl shutdown
else
  # supervisord will execute this script again after services status changes
  # usually a single reload is enough to catch up with Selenium server	
  echo "Selenium server is not available"
  exit 1
fi