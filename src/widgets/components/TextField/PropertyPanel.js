import React from 'react';
import {
    Form,
    FormItem,
    NativeField,
} from 'components/Form';
import 'components/Form/style/index.scss';
import { MultipleInputField } from 'components/FormField'
import SingleCheck from 'components/HTMLForm/SingleCheck';

export default function ({ data, onChange }) {

    const onFormChange = (d) => {
        onChange(Object.assign(data, d))
    }

    return (
        <Form
            onChange={onFormChange}
            formValue={data}
            labelWidth={60}
        >

            <FormItem
                className="design-property-field"
                label="字段名称"
                name="titlex"
            >
                <MultipleInputField />
            </FormItem>
            <FormItem
                className="design-property-field"
                label="字段名称"
                name="title"
            >
                <NativeField
                    component="input"
                />
            </FormItem>
            <FormItem
                className="design-property-field"
                label="提示文本"
                name="placeholder"
            >
                <NativeField
                    component="input"
                />
            </FormItem>
            <FormItem
                className="design-property-field"
                label="默认值"
                name="defaultValue"
            >
                <NativeField
                    component="input"
                />
            </FormItem>
            <FormItem
                className="design-property-field"
                label="必填"
                name="required"
            >
                <SingleCheck
                    on="1"
                    off="0"
                />
            </FormItem>

            <FormItem
                className="design-property-field"
                label="其他"
                name="abc"
            >
                <NativeField
                    component="textarea"
                />
            </FormItem>
        </Form >
    );
}