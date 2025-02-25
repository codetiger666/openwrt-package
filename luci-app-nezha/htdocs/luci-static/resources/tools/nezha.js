'use strict';
'require baseclass';
'require uci';
'require fs';
'require rpc';

const logFile = '/var/log/nezha.log';

return baseclass.extend({
    
    logFile: logFile,

    callServiceList: rpc.declare({
        object: 'service',
        method: 'list',
        params: ['name'],
        expect: { '': {} }
    }),

    getLog: function () {
        return L.resolveDefault(fs.exec_direct('/usr/libexec/nezha-call', ['get_log']), "日志为空或读取失败")
    },

    getVersion: function () {
        return L.resolveDefault(fs.exec_direct('/usr/libexec/nezha-call', ['version']), _('Unknown'));
    },

    getStatus: async function () {
        try {
            return (await this.callServiceList('nezha'))['nezha']['instances']['nezha']['running'];
        } catch (ignored) {
            return false;
        }
    },

    clearLog: function() {
            return fs.write(logFile);
    }
})