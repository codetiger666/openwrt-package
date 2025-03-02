'use strict';
'require view';
'require form';
'require uci';
'require poll';
'require tools.nezha as nezha';

function renderStatus(running) {
    return updateStatus(E('input', { id: 'status', style: 'border: unset; font-style: italic; font-weight: bold;', readonly: '' }), running);
}

function updateStatus(element, running) {
    if (element) {
        element.style.color = running ? 'green' : 'red';
        element.value = running ? _('Running') : _('Not Running');
    }
    return element;
}


// Project code format is tabs, not spaces
return view.extend({
    load: function () {
        return Promise.all([
            uci.load('nezha'),
            nezha.getVersion(),
            nezha.getStatus()
        ]);
    },
    render: function(data) {
        const version = data[1];
        const running = data[2];


        let m, s, o;

        m = new form.Map('nezha', _('Nezha Monitoring'),
            _('Open-source, lightweight, and easy-to-use server monitoring and operation tool'));

        s = m.section(form.TypedSection, 'config');
        s.anonymous = true;

        o = s.option(form.Flag, 'enable', '*' + '  ' + _('Enable'));
        o.default = '0';
        o.rmempty = false;

        o = s.option(form.Value, 'version', _('Version'));
        o.default = version;
        o.rmempty = true;
        o.readonly = true;

        o = s.option(form.DummyValue, 'status', _('Status'));
        o.cfgvalue = function () {
            return renderStatus(running);
        };
        o.rmempty = true;
        poll.add(function () {
            return L.resolveDefault(nezha.getStatus()).then(function (running) {
                updateStatus(document.getElementById('status'), running);
            });
        });

        o = s.option(form.Value, 'server', '*' + ' ' + _('Server address'));
        o.default = '127.0.0.1:5000';
        o.rmempty = false;

        o = s.option(form.Value, 'secret', '*' + ' ' + _('Server Secret'));
        o.default = '';
        o.rmempty = false;

        o = s.option(form.Flag, 'command_execute', _('Command Execute'));
        o.default = '0';
        o.rmempty = false;

        o = s.option(form.Flag, 'insecure_tls', _('Insecure Tls'));
        o.default = '0';
        o.rmempty = false;

        o = s.option(form.Flag, 'tls', _('Tls'));
        o.default = '1';
        o.rmempty = false;

        o = s.option(form.Flag, 'send_query', _('Send Query'));
        o.default = '1';
        o.rmempty = false;

        o = s.option(form.Flag, 'nat', _('Nat'));
        o.default = '0';
        o.rmempty = false;

        o = s.option(form.Value, 'uuid', _('uuid'));
        o.default = '';
        o.rmempty = false;

        o = s.option(form.DynamicList, 'nic_list', _('Interfaces To Monitor'));
        o.rmempty = true;
        
        return m.render();
    },
});