import React from 'react';
import LayoutContext from './LayoutContext';
import { getWidgetPropertyPanel } from './widgets';
import {
    Form,
    FormItem,
    NativeField,
} from 'components/Form';

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
                <Form
                    onChange={this.onDataChange}
                    formValue={activeItem}
                    labelWidth={60}
                >
                    <PPanel data={activeItem} key={activeItem.fieldId} />
                </Form>
            </div>
        );
    }
}