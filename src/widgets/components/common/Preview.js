import React from 'react';
import classNames from 'classnames';

export default function (props) {

    const classString = classNames({
        'widget-preview-item-inner': true,
        [props.className]: props.className
    });

    return (
        <div
            className={classString}
        >
            <label className="widget-preview-title">{props.title} </label>
            <span className="widget-preview-input">{props.placeholder}</span>
            <span className="widget-preview-close">x</span>
        </div>
    )
}