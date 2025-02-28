#!/bin/sh

program=ddns-go
homeDir=/etc/$program
logFile=/var/log/$program.log
conf=$homeDir/config.yaml
params=-c $conf -l :$2

case "$1" in
    clear_log_cron)
        LOG_SIZE=$(ls -l $logFile | awk '{print int($5/1024)}')
        if [ $LOG_SIZE -gt 100 ]; then
           echo $(tail -n 100 $logFile ) > $logFile
        fi
    ;;
    start)
        /usr/bin/$program $params> $logFile 2>&1
    ;;
esac