import React from "react";
import propTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { useDrag } from "react-dnd";
import invariant from "invariant";
import withHooks from "with-component-hooks";
import DesignerContext from "../DesignerContext";

class WidgetItem extends React.Component {
    static propTypes = {
        getInstance: propTypes.func,
        canDrag: propTypes.func,
        beginDrag: propTypes.func,
        endDrag: propTypes.func
    };

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

                if (beginDrag) {
                    beginDrag(item);
                }

                designer.addTmpItem(item);

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
                    monitor,
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
