include $(TOPDIR)/rules.mk

PKG_NAME:=ddns-go
PKG_RELEASE:=1
PKG_VERSION:=6.10.0

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/jeessy2/ddns-go.git
PKG_SOURCE_DATE:=2025-06-10
PKG_SOURCE_VERSION:=5e9736a9c1cd19cd9f53a78a1982b130bff57a63
PKG_MIRROR_HASH:=36cbaee1523b459b95812ac5e131763903f7d08adddafb675b12858febe564d3
PKG_BUILD_DEPENDS:=golang/host
PKG_BUILD_PARALLEL:=1
PKG_BUILD_FLAGS:=no-mips16

GO_PKG:=github.com/jeessy2/ddns-go
GO_PKG_LDFLAGS_X:=main.version=$(PKG_VERSION) main.buildTime=$(PKG_BUILD_TIME)
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

define Package/ddns-go
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Easy-to-use server monitoring and operation tool.
  URL:=https://github.com/jeessy2/ddns-go
  DEPENDS:=$(GO_ARCH_DEPENDS) +ca-bundle +curl +yq +base-scripts
  USERID:=ddns-go:ddns-go
endef

define Package/ddns-go/description
 A Dynamic DNS Resolver in Go.
endef

define Package/ddns-go/conffiles
/etc/config/ddns-go
/etc/ddns-go/config.yaml
endef

# 新增预处理段
define Build/Prepare
	$(call Build/Prepare/Default)
endef

define Package/ddns-go/install

	$(call GoPackage/Package/Install/Bin,$(1))

	$(INSTALL_DIR) $(1)/etc/ddns-go
	$(INSTALL_DATA) $(CURDIR)/files/config.yaml $(1)/etc/ddns-go/config.yaml
	$(INSTALL_BIN) $(CURDIR)/files/ddns-go.sh $(1)/etc/ddns-go/ddns-go.sh

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DATA) $(CURDIR)/files/ddns-go.conf $(1)/etc/config/ddns-go

	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_BIN) $(CURDIR)/files/init.sh $(1)/etc/uci-defaults/99_init_ddns-go

	$(INSTALL_DIR) $(1)/lib/upgrade/keep.d
	$(INSTALL_DATA) $(CURDIR)/files/ddns-go.upgrade $(1)/lib/upgrade/keep.d/ddns-go

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) $(CURDIR)/files/ddns-go.init $(1)/etc/init.d/ddns-go
endef

$(eval $(call GoBinPackage,ddns-go))
$(eval $(call BuildPackage,ddns-go))
