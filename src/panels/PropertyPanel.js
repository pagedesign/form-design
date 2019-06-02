import React from 'react';
import DesignContext from '../DesignContext';
// import { getWidgetPropertyPanel } from './widgets';
// import {
//     Form,
//     FormItem,
//     NativeField,
// } from 'components/Form';

export default class PropertyPanel extends React.Component {

    static contextType = DesignContext;

    onItemChange = (item) => {
        const designer = this.context;
        const activeItem = designer.getActiveItem();

        designer.updateItem({
            ...activeItem,
            ...item,
        });
    }

    render() {
        const designer = this.context;
        const activeItem = designer.getActiveItem();
        if (!activeItem) {
            return (
                <div className="property-panel">
                    <div style={{ padding: 30, textAlign: 'center' }}>请先选择控件</div>
                </div>
            )
        }

        const widget = designer.getWidget(activeItem.xtype);

        if (!widget) {
            return (
                <div className="property-panel">
                    <div style={{ padding: 30, textAlign: 'center' }}>无.</div>
                </div>
            );
        }

        return (
            <div className="property-panel">
                <widget.WidgetProperty
                    widget={widget}
                    onChange={this.onItemChange}
                    item={{ ...activeItem }}
                    key={activeItem.fieldId}
                />
            </div>
        );
    }
}