#!/bin/bash

killall node

# start web server
node src/server.js &

# start webhook server
node src/webhookServer.js &
