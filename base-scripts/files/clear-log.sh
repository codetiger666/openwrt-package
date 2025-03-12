#!/bin/sh

size=100

error() {
    echo "Usage:"
    echo "base-script [-f FILE] [-s SIZE]"
    echo -e "\n\t-f FILE Log File Path"
    echo -e "\t-s SIZE OR Default 100"
    exit 1
}

while getopts 'hf:s:' OPT; do
    case "$OPT" in
        f)
            file=$OPTARG
            ;;
        s)
            size=$OPTARG
            ;;
        h)
            error
            ;;
        ?)
            error
            ;;
    esac
done

# 检查是否未提供任何选项
if [[ $OPTIND -eq 1 ]]; then
    error
fi
    
LOG_SIZE=$(ls -l $2 | awk '{print int($5/1024)}')
if [ $LOG_SIZE -gt "${size}" ]; then
   echo "$(tail -n 100 ${file})" > ${file}
fi