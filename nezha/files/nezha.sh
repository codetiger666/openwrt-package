#!/bin/sh

program="nezha"
homeDir="/etc/$program"
logFile="/var/log/$program.log"
conf="$homeDir/agent.yaml"
params="-c $conf"

case "$1" in
    start)
        /usr/bin/${program}-agent $params >> $logFile 2>&1
    ;;
    stop)
        ps | grep "/usr/bin/${program}-agent" | grep -v grep | awk '{print $1}' | xargs kill -9 > /dev/null 2>&1
    ;;
esac