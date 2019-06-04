import React from 'react';
import {
    FormItem,
    NativeField,
} from 'components/Form';
import {
    MultipleInputField,
} from 'components/FormField';

import PropertyForm from '../PropertyForm';

import CommonPropertyPanel from '../common/CommonPropertyPanel';
import ValidatePropertyPanel from '../common/ValidatePropertyPanel';

export default function (props) {

    return (
        <PropertyForm {...props}>
            <CommonPropertyPanel />
            <FormItem
                className="design-property-field"
                label="选项值"
                name="data"
            >
                <MultipleInputField />
            </FormItem>
            <ValidatePropertyPanel />
        </PropertyForm>
    );
}