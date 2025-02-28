'use strict';
'require baseclass';
'require uci';
'require fs';
'require rpc';

const logFile = '/var/log/ddns-go.log';

return baseclass.extend({
    
    logFile: logFile,

    callServiceList: rpc.declare({
        object: 'service',
        method: 'list',
        params: ['name'],
        expect: { '': {} }
    }),

    getLog: function () {
        return L.resolveDefault(fs.exec_direct('/usr/libexec/ddns-go-call', ['get_log']), "日志为空或读取失败")
    },

    getVersion: function () {
        return L.resolveDefault(fs.exec_direct('/usr/libexec/ddns-go-call', ['version']), _('Unknown'));
    },

    getStatus: async function () {
        try {
            return (await this.callServiceList('ddns-go'))['ddns-go']['instances']['ddns-go']['running'];
        } catch (ignored) {
            return false;
        }
    },

    clearLog: function() {
            return fs.write(logFile);
    }
})