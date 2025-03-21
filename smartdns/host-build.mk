HOST_BUILD_DEPENDS += cmake git
HOST_BUILD_CMDS := \
    git clone https://github.com/llvm/llvm-project.git -b $(CLANG_VERSION) --dept=1 $(PKG_BUILD_DIR)/llvm
		(cd $(PKG_BUILD_DIR)/llvm && cmake -S llvm -B build -G "Unix Makefiles" \
		-DLLVM_ENABLE_PROJECTS="clang" \
		-DCMAKE_BUILD_TYPE=Release \
		-DCMAKE_INSTALL_PREFIX=$(STAGING_DIR_TARGET)/usr \
		&& cd build && make -j8 && make install)
