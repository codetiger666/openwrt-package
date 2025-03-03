#!/bin/sh

# app file
chown -R nezha:nezha /etc/nezha/agent.yaml

# check nezha.config.init
init=$(uci -q get nezha.config.init); [ -z "$init" ] && return

# gen new uuid
random=$(uuidgen)

# set nezha.config.uuid
uci set nezha.config.uuid="$random"

# remove nezha.config.init
uci del nezha.config.init

# commit
uci commit nezha

# exit with 0
exit 0
