import React from 'react';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import get from 'lodash/get';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
// import DefaultPreview from './components/common/Preview'
import {
    WIDGET_DRAG_DROP_SCOPE
} from '../../constants';
// import WidgetPlaceholderItem from './WidgetPlaceholderItem';
import DesignContext from '../../DesignContext';
// import isWidget from './isWidget';

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
    endDrag(props, monitor, component) {
        return;
        console.log('endDrag')
    }
};

const dragCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

const dropSpec = {

    canDrop(props, monitor, component) {
        const dragItem = monitor.getItem();
        if (dragItem.isWidgetDragging) return true;

        return props.item.fieldId !== dragItem.item.fieldId;

    },

    hover(props, monitor, component) {
        const { placeholderPosition } = component.state;
        const designer = component.context;
        const { item } = props;
        const dragItem = monitor.getItem();
        const dragItemFieldId = dragItem.item.fieldId;
        let isSortMode = false;

        if (!dragItem.isWidgetDragging) {
            isSortMode = true;
        }

        const dragOffset = monitor.getClientOffset();
        const previewDOM = findDOMNode(component);

        if (isSortMode) {
            // console.log('isSortMode', item.fieldId, dragItemFieldId)
            //顺序调整模式
            if (item.fieldId === dragItemFieldId) {
                return;
            } else {
                const targetOffset = previewDOM.querySelector('.widget-preview-item').getBoundingClientRect();
                const middleY = targetOffset.bottom - (targetOffset.height / 2);
                if (dragOffset.y <= middleY) {
                    console.log('top')
                    designer.insertBefore(dragItem.item, item.fieldId);
                } else {
                    designer.insertAfter(dragItem.item, item.fieldId);
                    console.log('bottom')
                }
                // console.log('can sort', middleY)
            }

        } else {
            //新增模式
            const targetOffset = previewDOM.getBoundingClientRect();
            const middleY = targetOffset.bottom - (targetOffset.height / 2);

            let pos = 'none';

            if (dragOffset.y <= middleY) {
                pos = 'top';
            } else {
                pos = 'bottom';
            }
            //设置放置位置
            if (placeholderPosition !== pos) {
                dragItem._dropTarget = {
                    id: item.fieldId,
                    pos,
                }

                component.setState({
                    placeholderPosition: pos
                });
            }

        }

    },

    drop(props, monitor, component) {
        const designer = component.context;
        let dragItem = monitor.getItem();

        if (!dragItem.isWidgetDragging) {
            return;
        }

        const dropId = get(dragItem, '_dropTarget.id', null);
        const dropPos = get(dragItem, '_dropTarget.pos', 'none');

        delete dragItem._dropTarget;

        if (dropId) {
            if (dropPos === 'top') {
                designer.insertBefore(dragItem.item, dropId);
            } else if (dropPos === 'bottom') {
                designer.insertAfter(dragItem.item, dropId);
            } else {
                designer.addItem(dragItem.item);
            }
        } else {
            designer.addItem(dragItem.item);
        }
    }
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        dragItem: monitor.getItem(),
    }
}

class WidgetPreviewItem extends React.Component {

    static contextType = DesignContext;

    state = {
        placeholderPosition: 'none', //none after before top bottom
    }

    handlePreviewClick(item) {
        const designer = this.context;
        designer.setActiveId(item.fieldId);
    }

    handleRemove = () => {
        const designer = this.context;
        const { item } = this.props;
        designer.removeItem(item.fieldId)
    }

    render() {
        const { connectDropTarget, connectDragSource, isDragging, isOver, widget, item, dragItem } = this.props;
        const { placeholderPosition } = this.state;
        const designer = this.context;
        const activeId = designer.getActiveId();
        //如果来源不是组建面板,则是排序模式
        const isSortMode = dragItem && !dragItem.isWidgetDragging;
        // const items = layout.getLayoutChildren(data.id);

        return connectDropTarget(
            <div className={cx({
                "widget-preview-item-wrapper": true,
                "droppable": isOver,
                "dragging": isDragging,
                // "drop-tips": canDrop,
            })}>
                {placeholderPosition === 'top' && isOver && !isSortMode ? <widget.PlaceholderPreview /> : null}
                <div
                    ref={connectDragSource}
                    className={cx({
                        "widget-preview-item": true,
                        "widget-preview-item-selected": activeId === item.fieldId,
                    })}
                    onClick={this.handlePreviewClick.bind(this, item)}
                >
                    <widget.Preview item={item} />
                    <span className="widget-preview-close" onClick={this.handleRemove}>x</span>
                </div>
                {placeholderPosition === 'bottom' && isOver && !isSortMode ? <widget.PlaceholderPreview /> : null}
            </div>
        );
    }
}

export default flow(
    DropTarget(WIDGET_DRAG_DROP_SCOPE, dropSpec, dropCollect),
    DragSource(WIDGET_DRAG_DROP_SCOPE, dragSpec, dragCollect),
)(WidgetPreviewItem)