import React from 'react';
import {
    Form,
    FormItem,
    NativeField,
} from '../../../components/Form';
import '../../../components/Form/style';

export default function ({ data, onChange }) {

    const onFormChange = (d) => {
        onChange(Object.assign(data, d))
    }

    return (
        <Form
            onChange={onFormChange}
            formValue={data}
        >
            <FormItem
                label="字段名称"
                name="title"
            >
                <NativeField
                    component="input"
                />
            </FormItem>
            <FormItem
                label="提示文本"
                name="placeholder"
            >
                <NativeField
                    component="input"
                />
            </FormItem>
            <FormItem
                label="默认值"
                name="defaultValue"
            >
                <NativeField
                    component="input"
                />
            </FormItem>
            <FormItem
                label="必填"
                name="defaultValue"
            >
                <NativeField
                    type="checkbox"
                    component="input"
                />
            </FormItem>
        </Form >
    );
}