#!/bin/sh

# 命令传递
apply_handle() {
  if [ -n "$1" ]; then
    echo "$2" | eval "$1"
    return
  fi
  echo $2
}


# 获取最新版本函数
get_latest_version() {
    case "$1" in
        release)
            # 使用 Releases API（按时间排序）
            curl -sfL "https://api.github.com/repos/$2/releases/latest" | jq -r '.tag_name'
            ;;
        tag)
            # 获取按时间排序的最新 Tag（需 GitHub API v3）
            curl -sfL "https://api.github.com/repos/$2/tags" | jq -r '.[0].name'
            ;;
        *)
            exit 1
            ;;
    esac
}