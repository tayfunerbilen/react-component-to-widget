import React from 'react';
import ReactDOM from 'react-dom';
import PrototurkWidget from './PrototurkWidget';

const widgets = document.querySelectorAll('.prototurk-widget')

widgets.forEach(widget => {
    ReactDOM.render(
        <React.StrictMode>
            <PrototurkWidget widget={widget} />
        </React.StrictMode>,
        widget
    );
})