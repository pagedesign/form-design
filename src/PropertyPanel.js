import React from 'react';
import LayoutContext from './LayoutContext';
import { getWidgetPropertyPanel } from './widgets';

export default class PropertyPanel extends React.Component {

    static contextType = LayoutContext;

    onDataChange = (data) => {
        const designer = this.context;
        designer.updateItem(data);
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

        const PPanel = getWidgetPropertyPanel(activeItem.xtype);

        return (
            <div className="property-panel">
                <PPanel data={activeItem} key={activeItem.fieldId} onChange={this.onDataChange} />
            </div>
        );
    }
}