import React from 'react';
import {
    Form,
    FormItem,
    NativeField,
} from 'components/Form';

import 'components/Form/style/index.scss';

export default class PropertyPanel extends React.Component {

    render() {
        const { item, onChange, children } = this.props;

        return (
            <Form
                onChange={onChange}
                formValue={item}
                labelWidth={60}
            >
                {children}
            </Form>
        );
    }
}