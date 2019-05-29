import React from 'react';
import { widgets, WidgetItem } from './widgets';

export default class WidgetsPanel extends React.Component {

    render() {

        return (
            <div className="widgets-panel">
                <div className="widgets-panel-header">
                    组件
                </div>
                <div className="widgets-panel-body">
                    {
                        widgets.map(widget => {
                            return (
                                <WidgetItem key={widget.xtype} widget={widget} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}