#!/bin/sh

program=nezha
homeDir=/etc/$program
logFile=/var/log/$program.log
conf=$homeDir/agent.yaml
params=-c $conf

case "$1" in
    clear_log_cron)
        LOG_SIZE=$(ls -l $logFile | awk '{print int($5/1024)}')
        if [ $LOG_SIZE -gt 100 ]; then
           echo $(tail -n 100 $logFile ) > $logFile
        fi
    ;;
    start)
        /usr/bin/${program}-agent $params> $logFile 2>&1
    ;;
esac