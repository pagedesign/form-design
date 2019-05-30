import React from 'react';

export default class PropertyPanel extends React.Component {

    render() {
        const { item } = this.props;
        return '属性面板:' + item.fieldId
    }
}