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
            <div className="property-header-title">输入校验</div>
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
        </div >
    );
}