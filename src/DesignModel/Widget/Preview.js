import React from "react";
import classNames from "classnames";

export default function(props) {
    const item = props.item;
    const classString = classNames({
        "widget-preview-item-inner": true,
        [props.className]: props.className
    });

    return (
        <div className={classString}>
            <label className="widget-preview-title">
                {item.title}({item.fieldId})
            </label>
            <span className="widget-preview-input">{item.placeholder}</span>
            {/* <span className="widget-preview-close" onClick={onRemove}>x</span> */}
        </div>
    );
}
