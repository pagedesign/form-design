import React from "react";
import { findDOMNode } from "react-dom";
import propTypes from "prop-types";
import withHooks from "with-component-hooks";
import { useDrop, useDrag } from "react-dnd";

import DesignerContext from "../DesignerContext";

function _canDrop(designer, dragItem, item, monitor) {
    const dragItemFieldId = dragItem.fieldId;
    const targetFieldId = item.fieldId;

    //解决父节点拖动到子节点的情况
    const pids = designer.getPids(targetFieldId);

    pids.push(targetFieldId);

    if (pids.indexOf(dragItemFieldId) > -1) return false;

    return true;
}

class DropItem extends React.Component {
    static propTypes = {
        item: propTypes.object.isRequired
    };

    getDropOptions() {
        const self = this;
        const { item } = this.props;
        const designer = React.useContext(DesignerContext);
        const DropContainerContext = designer.DropContainerContext;
        const { canDrop } = React.useContext(DropContainerContext);

        return {
            accept: designer.getScope(),
            // canDrop(props, monitor) {
            //     return true;
            // },

            hover({ item: dragItem }, monitor) {
                const isOver = monitor.isOver({ shallow: true });
                if (!isOver) return;

                const canDropRet = canDrop ? canDrop(dragItem, monitor) : true;

                if (
                    !canDropRet ||
                    !_canDrop(designer, dragItem, item, monitor)
                ) {
                    return;
                }

                // const dragItem = monitor.getItem();
                const dragOffset = monitor.getClientOffset();
                const previewDOM = findDOMNode(self);

                //顺序调整
                const targetOffset = previewDOM.getBoundingClientRect();
                const middleY = ~~(
                    targetOffset.bottom -
                    targetOffset.height / 2
                );

                if (dragOffset.y <= middleY) {
                    designer.insertBefore(dragItem, item.fieldId);
                } else {
                    designer.insertAfter(dragItem, item.fieldId);
                }
            },

            collect(monitor) {
                return {
                    monitor,
                    isOver: monitor.isOver(),
                    isHover: monitor.isOver({ shallow: true }),
                    canDrop: designer.isTmpItem(item)
                        ? false
                        : monitor.canDrop()
                };
            }
        };
    }

    getDragOptions() {
        const { item } = this.props;
        const designer = React.useContext(DesignerContext);

        return {
            item: {
                type: designer.getScope()
            },

            begin(props) {
                designer.setItemDragging(item);

                return {
                    item
                };
            },

            end(item, monitor) {
                // if (endDrag) {
                //     endDrag(item);
                // }

                designer.clearTmpItems();
            },

            collect(monitor) {
                return {
                    // monitor,
                    isDragging: monitor.isDragging()
                };
            }
        };
    }

    _connectDropTarget = null;
    _connectDragTarget = null;

    connectDropAndDrag() {
        const { disabled } = this.props;

        const dom = findDOMNode(this);
        if (this._connectDropTarget) {
            this._connectDropTarget(disabled ? null : dom);
        }
        if (this._connectDragTarget) {
            this._connectDragTarget(disabled ? null : dom);
        }
    }

    componentDidMount() {
        this.connectDropAndDrag();
    }

    componentDidUpdate() {
        this.connectDropAndDrag();
    }

    componentWillUnmount() {
        if (this._connectDropTarget) {
            this._connectDropTarget(null);
        }
        if (this._connectDragTarget) {
            this._connectDragTarget(null);
        }
    }

    render() {
        const { children, item } = this.props;
        const designer = React.useContext(DesignerContext);

        const [collectedDropProps, connectDropTarget] = useDrop(
            this.getDropOptions()
        );

        const [collectedDragProps, connectDragTarget] = useDrag(
            this.getDragOptions()
        );

        this._connectDropTarget = connectDropTarget;
        this._connectDragTarget = connectDragTarget;

        // const connectDragAndDropTarget = dom => {
        //     connectDropTarget(dom);
        //     connectDragTarget(dom);
        // };

        const child =
            typeof children === "function"
                ? children({
                      ...collectedDropProps,
                      ...collectedDragProps,
                      isTmp: designer.isTmpItem(item),
                      isDragging: designer.isDragging(item)
                  })
                : children;

        React.Children.only(child);

        return child;
    }
}

export default withHooks(DropItem);
