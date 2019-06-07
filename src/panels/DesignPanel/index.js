import React from 'react';
import DesignContext from '../../DesignContext';
import WidgetDropAccepter from './WidgetDropAccepter';

export default class DesignPanel extends React.Component {
    static contextType = DesignContext;

    render() {
        const pid = null
        const designer = this.context;
        const items = designer.getItems(pid);

        return (
            <div className="design-panel">
                <WidgetDropAccepter items={items} pid={pid} />
            </div>
        );
    }
}