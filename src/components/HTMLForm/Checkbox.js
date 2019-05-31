import React from 'react';
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
    const

    return (
        <FormItem
            {...props}
            className={classNames("design-property-field", props.className)}
        >
            <NativeField
                checked={props.value === props.on}
                component="textarea"
            />
        </FormItem>
    );
}