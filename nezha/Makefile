include $(TOPDIR)/rules.mk

PKG_NAME:=nezha
PKG_RELEASE:=1
PKG_VERSION:=1.9.6

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/nezhahq/agent.git
PKG_SOURCE_DATE:=2025-03-19
PKG_SOURCE_VERSION:=3cd0cc0961115d54f736e29db582f58a502e83da
PKG_MIRROR_HASH:=b27ed40f103687f3fc6cf3d0b2a380942f15c35109599f1c35de1035f18e95df
PKG_BUILD_DEPENDS:=golang/host
PKG_BUILD_PARALLEL:=1
PKG_BUILD_FLAGS:=no-mips16

GO_PKG:=github.com/nezhahq/agent
GO_PKG_BUILD_PKG:=$(GO_PKG)/cmd/agent  
GO_PKG_LDFLAGS_X:=$(GO_PKG)/pkg/monitor.Version=$(PKG_VERSION) main.arch=$(ARCH)
GO_PKG_LDFLAGS:=-s -w

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/golang/golang-package.mk

ifeq ($(ARCH),arm64)
	PROGARM_ARCH:=/linux_arm64
endif

ifeq ($(ARCH),aarch64)
	PROGARM_ARCH:=/linux_arm64
endif

ifeq ($(ARCH),x86_64)
	PROGARM_ARCH:=
endif

ifeq ($(ARCH),mipsel)
	PROGARM_ARCH:=/linux_mipsle
endif

define Package/nezha
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Easy-to-use server monitoring and operation tool.
  URL:=https://github.com/nezhahq/agent
  DEPENDS:=$(GO_ARCH_DEPENDS) +ca-bundle +curl +yq +base-scripts
  USERID:=nezha:nezha
endef

define Package/nezha/description
 A monitor in Go.
endef

define Package/nezha/conffiles
/etc/config/nezha
/etc/nezha/agent.yaml
endef

# 新增预处理段
define Build/Prepare
	$(call Build/Prepare/Default)
	(cd $(PKG_BUILD_DIR) && \
		go mod tidy -v && \
		go generate ./...)
endef

define Build/Compile
	# 标准编译流程
	$(call GoPackage/Build/Compile)
	echo "编译架构:  $(ARCH)"
endef

define Package/nezha/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/.go_work/build/bin$(PROGARM_ARCH)/agent $(1)/usr/bin/nezha-agent

	$(INSTALL_DIR) $(1)/etc/nezha
	$(INSTALL_DATA) $(CURDIR)/files/agent.yaml $(1)/etc/nezha/agent.yaml
	$(INSTALL_BIN) $(CURDIR)/files/nezha.sh $(1)/etc/nezha/nezha.sh

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DATA) $(CURDIR)/files/nezha.conf $(1)/etc/config/nezha

	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_BIN) $(CURDIR)/files/init.sh $(1)/etc/uci-defaults/99_init_nezha

	$(INSTALL_DIR) $(1)/lib/upgrade/keep.d
	$(INSTALL_DATA) $(CURDIR)/files/nezha.upgrade $(1)/lib/upgrade/keep.d/nezha

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) $(CURDIR)/files/nezha.init $(1)/etc/init.d/nezha
endef

$(eval $(call GoBinPackage,nezha))
$(eval $(call BuildPackage,nezha))
