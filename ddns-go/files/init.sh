#!/bin/sh

# log file
touch /var/log/ddns-go.log
chown -R ddns-go:ddns-go /var/log/ddns-go.log

# check ddns-go.config.init
init=$(uci -q get ddns-go.config.init); [ -z "$init" ] && return

# remove ddns-go.config.init
uci del ddns-go.config.init

# commit
uci commit ddns-go

# exit with 0
exit 0
