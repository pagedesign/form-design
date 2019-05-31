import React from 'react';
import { FormItem, NativeField } from '../Form'
import classNames from 'classnames';

export default function Checkbox(props) {

    const onChange = (e) => {
        const target = e.target;
        if (target.checked) {
            props.onChange && props.onChange(props.on);
        } else {
            props.onChange && props.onChange(props.off);
        }
    }


    return (
        <input
            {...props}
            checked={props.value === props.on}
            type="checkbox"
            onChange={onChange}
        />
    );
}