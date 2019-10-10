import React from "react";
import DesignContext from "../../DesignContext";
import WidgetItem from "./WidgetItem";

export default class WidgetsPanel extends React.Component {
    static contextType = DesignContext;

    render() {
        const { render } = this.props;
        const designer = this.context;
        const widgets = designer.getWidgets();

        let childs = widgets.map(widget => {
            return (
                <WidgetItem
                    designer={designer}
                    key={widget.xtype}
                    widget={widget}
                />
            );
        });

        if (render) {
            childs = render(childs);
        }

        return (
            <div className="widgets-panel">
                <div className="widgets-panel-header">控件列表</div>
                <div className="widgets-panel-body">{childs}</div>
            </div>
        );
    }
}
