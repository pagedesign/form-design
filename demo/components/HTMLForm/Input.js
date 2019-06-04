import React from 'react';
import classNames from 'classnames';

export default function Input(props) {

    return (
        <FormItem
            {...props}
            className={classNames("design-property-field", props.className)}
        >
            <NativeField
                component="input"
            />
        </FormItem>
    );
}