import React from 'react';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import {
    WIDGET_DRAG_DROP_SCOPE
} from '../../constants';
import DesignContext from '../../DesignContext';

const dragSpec = {
    beginDrag(props) {
        const widget = props.widget;
        const item = props.item;
        return {
            isWidgetDragging: false,
            isPreviewDragging: false,
            widget: widget,
            item: item,
        };
    },
    // endDrag(props, monitor, component) {
    //     console.log('endDrag')
    // }
};

const dragCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

function canDrop(props, monitor) {
    const designer = props.designer;
    const dragItem = monitor.getItem();
    const dragItemFieldId = dragItem.item.fieldId;
    const targetFieldId = props.item.fieldId;

    //解决父节点拖动到子节点的情况
    const pids = designer.getPids(targetFieldId);

    pids.push(targetFieldId);

    if (pids.indexOf(dragItemFieldId) > -1) return false;

    return true;
}

const dropSpec = {
    canDrop(props, monitor) {
        return true;
    },

    hover(props, monitor, component) {
        const isOver = monitor.isOver({ shallow: true });
        if (!isOver) return;

        if (!monitor.canDrop() || !canDrop(props, monitor, component)) return;

        const designer = component.context;
        const { item } = props;
        const dragItem = monitor.getItem();
        const dragOffset = monitor.getClientOffset();
        const previewDOM = findDOMNode(component);

        //顺序调整
        const targetOffset = previewDOM.getBoundingClientRect();
        const middleY = ~~(targetOffset.bottom - (targetOffset.height / 2));

        if (dragOffset.y <= middleY) {
            designer.insertBefore(dragItem.item, item.fieldId);
        } else {
            designer.insertAfter(dragItem.item, item.fieldId);
        }

    },

    // drop(props, monitor, component) {
    //     //TODO
    // }
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        // dragItem: monitor.getItem(),
    }
}

class WidgetPreviewItem extends React.Component {

    static contextType = DesignContext;

    state = {
        // placeholderPosition: 'none', //none after before top bottom
    }

    handlePreviewClick(item, e) {
        if (e.isDefaultPrevented()) {
            return;
        }
        e.preventDefault();
        const designer = this.context;
        designer.setActiveId(item.fieldId);
    }

    handleRemove = () => {
        const designer = this.context;
        const { item } = this.props;
        designer.removeItem(item.fieldId)
    }

    handleDragAndDrop = (dom) => {
        const {
            connectDropTarget,
            connectDragSource,
        } = this.props;

        connectDropTarget(dom);
        connectDragSource(dom);

    }

    render() {
        const {
            connectDropTarget,
            connectDragSource,
            isDragging,
            isOver,
            widget,
            item,
            // dragItem,
            visible,
        } = this.props;
        // const { placeholderPosition } = this.state;
        const designer = this.context;
        const activeId = designer.getActiveId();
        //如果来源不是组建面板,则是排序模式
        // const isSortMode = dragItem && !dragItem.isWidgetDragging;
        // const items = layout.getLayoutChildren(data.id);

        return (
            <div
                ref={this.handleDragAndDrop}
                className={cx({
                    "widget-preview-item-wrapper": true,
                    "droppable": isOver,
                    "dragging": isDragging,
                    // "drop-tips": canDrop,
                })}

                style={{
                    display: visible ? 'inline-block' : 'none',
                    width: item.width || '100%'
                }}

            >
                <div
                    className={cx({
                        "widget-preview-item": true,
                        "widget-preview-item-selected": activeId === item.fieldId,
                    })}
                    onClick={this.handlePreviewClick.bind(this, item)}
                >
                    <widget.Preview item={item} designer={designer} />
                    <span className="widget-preview-close" onClick={this.handleRemove}>x</span>
                </div>
            </div>
        );
    }
}

export default flow(
    DropTarget(WIDGET_DRAG_DROP_SCOPE, dropSpec, dropCollect),
    DragSource(WIDGET_DRAG_DROP_SCOPE, dragSpec, dragCollect),
)(WidgetPreviewItem)