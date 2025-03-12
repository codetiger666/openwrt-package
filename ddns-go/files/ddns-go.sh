#!/bin/sh

program="ddns-go"
homeDir="/etc/$program"
logFile="/var/log/$program.log"
conf="$homeDir/config.yaml"
params="-c $conf -l :$2"

case "$1" in
    start)
        /usr/bin/$program $params >> $logFile 2>&1
    ;;
    stop)
        ps | grep "/usr/bin/${program}" | grep -v grep | awk '{print $1}' | xargs kill -9 > /dev/null 2>&1
    ;;
esac