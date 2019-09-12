import React from "react";
import withHooks from "with-component-hooks";
import { useDrop, useDrag } from "react-dnd";
import invariant from "invariant";

import DesignerContext from "../DesignerContext";

class DropItem extends React.Component {
    getDropOptions() {
        const designer = React.useContext(DesignerContext);

        return {
            accept: designer.getScope()
        };
    }

    getDragOptions() {
        const designer = React.useContext(DesignerContext);

        return {};
    }

    render() {
        const { children } = this.props;
        invariant(
            typeof children !== "function",
            "DropItem children must be function!"
        );

        const [collectedDropProps, connectDropTarget] = useDrop(
            this.getDropOptions()
        );

        const [collectedDragProps, connectDragTarget] = useDrag(
            this.getDragOptions()
        );

        const connectDragAndDropTarget = dom => {
            connectDropTarget(dom);
            connectDragTarget(dom);
        };

        const child = children(connectDragAndDropTarget);

        React.Children.only(child);

        return child;
    }
}

export default withHooks(DropItem);
