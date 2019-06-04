import React from 'react';
import classNames from 'classnames';

export default function Textarea(props) {

    return (
        <FormItem
            {...props}
            className={classNames("design-property-field", props.className)}
        >
            <NativeField
                component="textarea"
            />
        </FormItem>
    );
}