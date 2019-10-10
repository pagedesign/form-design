import React from "react";
import PropTypes from "prop-types";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import DesignModel from "./DesignModel";
import WidgetsPanel from "./panels/WidgetsPanel";
import PropertyPanel from "./panels/PropertyPanel";
import DesignPanel from "./panels/DesignPanel";

import { P_PC, P_MOBILE, P_IPAD } from "./constants";

export default class Designer extends React.Component {
    static propTypes = {
        widgets: PropTypes.array,
        platform: PropTypes.oneOf([P_PC, P_MOBILE, P_IPAD]),
        metadata: PropTypes.object
    };

    static defaultProps = {
        onChange: null,
        platform: P_PC,
        widgets: [],
        metadata: {
            items: []
        }
    };

    handleModelChange = items => {
        const { onChange, metadata } = this.props;

        onChange &&
            onChange({
                ...metadata,
                items
            });
    };

    render() {
        const { widgets, renderWidgetList, metadata, platform } = this.props;

        return (
            <DndProvider backend={HTML5Backend}>
                <DesignModel
                    widgets={widgets}
                    items={metadata.items}
                    platform={platform}
                    onChange={this.handleModelChange}
                >
                    <div className="csos-form-designer">
                        <div className="csos-form-designer-container">
                            <WidgetsPanel render={renderWidgetList} />
                            <DesignPanel />
                            <PropertyPanel />
                        </div>
                    </div>
                </DesignModel>
            </DndProvider>
        );
    }
}
