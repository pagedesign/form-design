import React from 'react';
import WidgetsPanel from './WidgetsPanel';
import PropertyPanel from './PropertyPanel';
import DesignPanel from './DesignPanel';

export default class Layout extends React.Component {

    render() {

        return (
            <div className="ex-form-design-container">
                <WidgetsPanel />
                <DesignPanel />
                <PropertyPanel />
            </div>
        );
    }
}