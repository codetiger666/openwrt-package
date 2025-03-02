'use strict';
'require form';
'require view';
'require uci';
'require poll';
'require tools.ddns-go as ddnsgo';

return view.extend({
    load: function () {
        return Promise.all([
            uci.load('ddns-go'),
            ddnsgo.getLog()
        ]);
    },
    render: function (data) {

        let appLog = data[1];

        let m, s, o;

        m = new form.Map('ddns-go');

        s = m.section(form.NamedSection, 'log', 'log', _('Log'));

        o = s.option(form.Button, 'clear_log');
        o.inputstyle = 'negative';
        o.inputtitle = _('Clear Log');
        o.onclick = function () {
            m.lookupOption('ddns-go.log._app_log')[0].getUIElement('log').setValue('');
            return ddnsgo.clearLog();
        };

        o = s.option(form.TextValue, '_app_log');
        o.rows = 25;
        o.wrap = false;
        o.load = function (section_id) {
            return appLog;
        };
        o.write = function (section_id, formvalue) {
            return true;
        };

        poll.add(L.bind(function () {
            const option = this;
            return L.resolveDefault(ddnsgo.getLog()).then(function (log) {
                option.getUIElement('log').setValue(log);
            });
        }, o));

        return m.render();
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});