#!/bin/sh

# app file
chown -R ddns-go:ddns-go /etc/ddns-go/config.yaml

# check ddns-go.config.init
init=$(uci -q get ddns-go.config.init); [ -z "$init" ] && return

# remove ddns-go.config.init
uci del ddns-go.config.init

# commit
uci commit ddns-go

# exit with 0
exit 0
