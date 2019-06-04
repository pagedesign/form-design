import React from 'react';

export default function NativeField(props) {
    const {
        component: Component = 'input',
        value,
        inputRef,
        onChange,
        ...others
    } = props;

    const onInputChange = (e) => {
        const value = e.target.value;
        onChange && onChange(value, e);
    }

    return (
        <Component
            ref={inputRef}
            onChange={onInputChange}
            value={value}
            {...others}
        />
    );
}