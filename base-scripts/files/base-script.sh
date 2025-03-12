#!/bin/sh

case "$1" in
    clear_log_cron)
        LOG_SIZE=$(ls -l $2 | awk '{print int($5/1024)}')

        if [ $LOG_SIZE -gt "${$3:-100}" ]; then
           echo $(tail -n 100 $2 ) > $2
        fi
    ;;
    *)
        echo "unknown command";
        echo "Please Use Commond parameter";
        echo "etc: base-script.sh clear_log_cron filePath 100";
    ;;
esac