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

import CommonPropertyPanel from '../common/CommonPropertyPanel';
import ValidatePropertyPanel from '../common/ValidatePropertyPanel';

export default function () {

    return (
        <div>
            <CommonPropertyPanel />
            <FormItem
                className="design-property-field"
                label="选项值"
                name="data"
            >
                <MultipleInputField />
            </FormItem>
            <ValidatePropertyPanel />
        </div>
    );
}