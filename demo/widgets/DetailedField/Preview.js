import React from 'react';
import classNames from 'classnames';
import WidgetDropAccepter from '../../../src/panels/DesignPanel/WidgetDropAccepter';
import "./Preview.scss"

export default function (props) {
    const item = props.item;
    const designer = props.designer;
    const classString = classNames({
        // 'widget-preview-item-inner': true,
        'widget-preview-item-detailed': true,
        [props.className]: props.className
    });
    const items = designer.getItems(item.fieldId);
    console.log(item.fieldId, items, designer.getAllItems(), 'xxx')

    return (
        <div
            className={classString}
        >
            <label className="widget-preview-detailed-sub">{item.title}</label>
            <div className="widget-preview-detailed-list">
                <WidgetDropAccepter
                    items={items}
                    pid={item.fieldId}
                />
            </div>
        </div>
    )
}