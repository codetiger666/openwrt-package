'use strict';
'require view';
'require form';
'require uci';
'require poll';
'require tools.ddns-go as ddnsgo';

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
            uci.load('ddns-go'),
            ddnsgo.getVersion(),
            ddnsgo.getStatus()
        ]);
    },
    render: function(data) {
		
        const version = data[1];
        let running = data[2];

        let m, s, st, o;

        m = new form.Map('ddns-go', _('DDNS-GO'),
            _('Automatically obtain your public IPv4 or IPv6 address and resolve it to the corresponding domain name service.'));
        
        st = m.section(form.TypedSection, 'config');
        st.anonymous = true;

        o = st.option(form.Value, 'version', _('Version'));
        o.default = version;
        o.rmempty = true;
        o.readonly = true;

        o = st.option(form.DummyValue, 'status', _('Status'));
        o.cfgvalue = function () {
            return renderStatus(running);
        };
        o.rmempty = true;
        poll.add(function () {
            return L.resolveDefault(ddnsgo.getStatus()).then(function (status) {
                running = status;
                updateStatus(document.getElementById('status'), status);
            });
        });
        
        o = st.option(form.Button, 'open_dash', _('Open DDNS GO Dashboard'));
		o.depends('enable', '1');
        o.rmempty = true;
        o.inputtitle = window.location.protocol + '//' + window.location.hostname + ':' + uci.get('ddns-go', 'config', 'port');
        o.onclick = function () {
            if (running) {
                window.open(window.location.protocol + '//' + window.location.hostname + ':' + uci.get('ddns-go', 'config', 'port'));
            }
            alert(_('Service Not Running!'));
        };

        s = m.section(form.TypedSection, 'config');
        s.anonymous = true;

        o = s.option(form.Flag, 'enable', '*' + '  ' + _('Enable'));
        o.default = '0';
        o.rmempty = false;

        o = s.option(form.Value, 'port', '*' + ' ' + _('Port'));
        o.default = '9876';
        o.rmempty = false;
        
        return m.render();
    },
});