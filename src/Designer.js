import React from "react";
import PropTypes from "prop-types";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import DesignModel from "./DesignModel";

export default class Designer extends React.Component {
    static propTypes = {
        widgets: PropTypes.array,
        metadata: PropTypes.object
    };

    static defaultProps = {
        onChange: null,
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
        const { metadata, children, ...props } = this.props;

        return (
            <DndProvider backend={HTML5Backend}>
                <DesignModel
                    {...props}
                    items={metadata.items}
                    onChange={this.handleModelChange}
                >
                    {children}
                </DesignModel>
            </DndProvider>
        );
    }
}
