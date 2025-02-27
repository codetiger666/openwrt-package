#!/bin/sh

logFile=/var/log/ddns-go.log

case "$1" in
    clear_log_cron)
        LOG_SIZE=\$(ls -l $logFile | awk '{print int(\$5/1024)}')
        if [ \$LOG_SIZE -gt 100 ]; then
           tail -n 100 $logFile > $logFile.tmp
           mv $logFile.tmp $logFile
        fi
    ;;
esac