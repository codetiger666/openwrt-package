include $(TOPDIR)/rules.mk

PKG_NAME:=base-scripts
PKG_RELEASE:=1
PKG_VERSION:=0.2

PKG_SOURCE_DATE:=$(shell date +%Y-%m-%d)
PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk

define Package/base-scripts
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Some Scripts For Base.
endef

define Build/Compile
  echo "building"
endef

define Package/base-scripts/description
 Some Scripts For Base.
endef

define Package/base-scripts/install
	$(INSTALL_DIR) $(1)/etc/scripts
	$(INSTALL_BIN) $(CURDIR)/files/clear-log.sh $(1)/etc/scripts/clear-log.sh
endef

$(eval $(call BuildPackage,base-scripts))
