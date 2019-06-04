import React from 'react';
import {
    FormItem,
    NativeField,
} from 'components/Form';
import 'components/Form/style/index.scss';
import {
    MultipleInputField,
    DisplayField,
    WidthInputField
} from 'components/FormField';
import SingleCheck from 'components/HTMLForm/SingleCheck';

export default function () {

    return (
        <div>
            <div className="property-header-title">基础属性</div>
            <FormItem
                className="design-property-field"
                label="控件ID"
                name="fieldId"
            >
                <DisplayField />
            </FormItem>
            {/* <FormItem
                className="design-property-field"
                label="字段名称"
                name="titlex"
            >
                <MultipleInputField />
            </FormItem> */}
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
            {/* <FormItem
                className="design-property-field"
                label="宽度"
                name="width"
            >
                <WidthInputField />
            </FormItem> */}
            {/* <FormItem
                className="design-property-field"
                label="必填"
                name="required"
            >
                <SingleCheck
                    on="1"
                    off="0"
                />
            </FormItem> */}
        </div >
    );
}