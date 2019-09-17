import React from "react";
import { findDOMNode } from "react-dom";
import { useDrag } from "react-dnd";
import invariant from "invariant";
import withHooks from "with-component-hooks";
import DesignerContext from "../DesignerContext";

class WidgetItem extends React.Component {
    _connectDragSource = null;

    connectDrag() {
        const { disabled } = this.props;

        const dom = findDOMNode(this);
        if (this._connectDragSource) {
            this._connectDragSource(disabled ? null : dom);
        }
    }

    componentDidMount() {
        this.connectDrag();
    }

    componentDidUpdate() {
        this.connectDrag();
    }

    render() {
        const {
            children,
            getInstance,
            component: Component = "div",
            canDrag,
            beginDrag,
            endDrag,
            ...props
        } = this.props;

        const designer = React.useContext(DesignerContext);

        const [collectProps, connectDragSource] = useDrag({
            item: {
                type: designer.getScope()
            },

            canDrag(monitor) {
                if (canDrag) {
                    return canDrag();
                }
                return true;
            },

            begin(monitor) {
                const item = getInstance();
                designer.addTmpItem(item);

                if (beginDrag) {
                    beginDrag(item);
                }

                return {
                    item: item
                };
            },

            end(item, monitor) {
                if (endDrag) {
                    endDrag(item);
                }
                designer.clearTmpItems();
            },

            collect(monitor) {
                return {
                    isDragging: monitor.isDragging()
                };
            }
        });

        this._connectDragSource = connectDragSource;

        return typeof children === "function"
            ? children(collectProps)
            : children;
    }
}

export default withHooks(WidgetItem);
