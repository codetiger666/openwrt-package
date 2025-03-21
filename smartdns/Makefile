#
# Copyright (c) 2018-2024 Nick Peng (pymumu@gmail.com)
# This is free software, licensed under the GNU General Public License v3.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=smartdns
PKG_VERSION:=Release46.1
PKG_RELEASE:=1

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/codetiger666/smartdns.git
PKG_MIRROR_HASH:=skip
PKG_BUILD_DEPENDS:=rust/host
PKG_SOURCE_VERSION:=24e29f4f31e8932615dfb74cb0fde5a448fd4eac

PKG_MAINTAINER:=Nick Peng <pymumu@gmail.com>
PKG_LICENSE:=GPL-3.0-or-later
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk

CLANG_PATH := $(STAGING_DIR_HOSTPKG)/usr/clang
MAKE_VARS += VER=$(PKG_VERSION) 
MAKE_VARS += WITH_UI=1
MAKE_VARS += BUILD_ARCH=$(ARCH)-unknown-linux-musl
MAKE_VARS += LIBCLANG_PATH=$(CLANG_PATH)/lib
MAKE_VARS += C_INCLUDE_PATH=$(C_INCLUDE_PATH):$(CLANG_PATH)/include

MAKE_PATH :=
CLANG_VERSION=llvmorg-20.1.1
LIB_CLANG_EXISTS := $(shell ldconfig -p | grep -q libclang.so && echo "yes" || echo "no")


define Package/smartdns
  SECTION:=net
  CATEGORY:=Network
  TITLE:=smartdns server
  DEPENDS:=+libpthread +libopenssl
  URL:=https://www.github.com/pymumu/smartdns/
endef

define Package/smartdns/description
SmartDNS is a local DNS server which accepts DNS query requests from local network clients,
gets DNS query results from multiple upstream DNS servers concurrently, and returns the fastest IP to clients.
Unlike dnsmasq's all-servers, smartdns returns the fastest IP, and encrypt DNS queries with DoT or DoH. 
endef

define Package/smartdns/conffiles
/etc/config/smartdns
/etc/smartdns/address.conf
/etc/smartdns/blacklist-ip.conf
/etc/smartdns/custom.conf
/etc/smartdns/domain-block.list
/etc/smartdns/domain-forwarding.list
endef

define Build/Compile
	if [ "$(LIB_CLANG_EXISTS)" = "no" ]; then \
		git clone https://github.com/llvm/llvm-project.git -b $(CLANG_VERSION) --dept=1 $(PKG_BUILD_DIR)/llvm &&\
		(cd $(PKG_BUILD_DIR)/llvm && cmake -S llvm -B build -G "Unix Makefiles" \
		-DLLVM_ENABLE_PROJECTS="clang" \
		-DCMAKE_BUILD_TYPE=Release \
		-DCMAKE_INSTALL_PREFIX=$(CLANG_PATH) \
		&& cd build && make -j8 && make install) \
	fi
	$(call Build/Compile/Default)
endef

define Package/smartdns/install
	$(INSTALL_DIR) $(1)/usr/sbin $(1)/etc/config $(1)/etc/init.d 
	$(INSTALL_DIR) $(1)/etc/smartdns $(1)/etc/smartdns/domain-set $(1)/etc/smartdns/conf.d/
	$(INSTALL_DIR) $(1)/etc/smartdns/ip-set $(1)/etc/smartdns/download
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/src/smartdns $(1)/usr/sbin/smartdns
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/plugin/smartdns-ui/target/libsmartdns_ui.so $(1)/etc/smartdns/libsmartdns_ui.so
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/package/openwrt/files/etc/init.d/smartdns $(1)/etc/init.d/smartdns
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/package/openwrt/address.conf $(1)/etc/smartdns/address.conf
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/package/openwrt/blacklist-ip.conf $(1)/etc/smartdns/blacklist-ip.conf
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/package/openwrt/custom.conf $(1)/etc/smartdns/custom.conf
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/package/openwrt/domain-block.list $(1)/etc/smartdns/domain-block.list
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/package/openwrt/domain-forwarding.list $(1)/etc/smartdns/domain-forwarding.list
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/package/openwrt/files/etc/config/smartdns $(1)/etc/config/smartdns
endef

$(eval $(call BuildPackage,smartdns))
