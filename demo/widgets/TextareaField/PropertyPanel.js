import React from 'react';
import {
    FormItem,
    NativeField,
} from 'components/Form';

import PropertyForm from '../PropertyForm';

import CommonPropertyPanel from '../common/CommonPropertyPanel';
import ValidatePropertyPanel from '../common/ValidatePropertyPanel';

export default function (props) {

    return (
        <PropertyForm {...props}>
            <CommonPropertyPanel />
            <FormItem
                className="design-property-field"
                label="高度"
                name="height"
            >
                <NativeField
                    component="input"
                />
            </FormItem>
            <ValidatePropertyPanel />
        </PropertyForm>
    );
}