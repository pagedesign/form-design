import React from 'react';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import get from 'lodash/get';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import DefaultPreview from './components/common/Preview'
import Types from '../common/WidgetTypes';
import WidgetPlaceholderItem from './WidgetPlaceholderItem';
import LayoutContext from '../LayoutContext';
import isWidget from './isWidget';
// import { uuid } from '../utils';
/* global $ */
const dragSpec = {
    beginDrag(props) {
        console.log('beginDrag, xx')
        console.log(props.item)
        return props.item;
        //  return props.data;
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
        const item = monitor.getItem();

        if (isWidget(item)) return true;

        return props.item.fieldId !== item.fieldId;

    },

    hover(props, monitor, component) {
        const { placeholderPosition } = component.state;
        const designer = component.context;
        const { item } = props;
        const dragItem = monitor.getItem();
        let isSortMode = false;

        if (!isWidget(dragItem)) {
            isSortMode = true;
        }

        const dragOffset = monitor.getClientOffset();
        const previewDOM = findDOMNode(component);

        if (isSortMode) {
            //顺序调整模式
            if (item.fieldId === dragItem.fieldId) {
                return;
            } else {
                const targetOffset = previewDOM.querySelector('.widget-preview-item').getBoundingClientRect();
                const middleY = targetOffset.bottom - (targetOffset.height / 2);
                if (dragOffset.y <= middleY) {
                    console.log('top')
                    designer.insertBefore(dragItem, item.fieldId);
                } else {
                    designer.insertAfter(dragItem, item.fieldId);
                    console.log('bottom')
                }
                console.log('can sort', middleY)
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

        if (!isWidget(dragItem)) {
            return;
        }

        const dropId = get(dragItem, '_dropTarget.id', null);
        const dropPos = get(dragItem, '_dropTarget.pos', 'none');

        delete dragItem._dropTarget;

        if (isWidget(dragItem)) {
            dragItem = dragItem.props;
        }

        if (dropId) {
            if (dropPos === 'top') {
                designer.insertBefore(dragItem, dropId);
            } else if (dropPos === 'bottom') {
                designer.insertAfter(dragItem, dropId);
            } else {
                designer.addItem(dragItem);
            }
        } else {
            designer.addItem(dragItem);
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

    static contextType = LayoutContext;

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
        const { connectDropTarget, connectDragSource, isDragging, isOver, canDrop, item, dragItem } = this.props;
        const { placeholderPosition } = this.state;
        const designer = this.context;
        const activeId = designer.getActiveId();
        //如果来源不是组建面板,则是排序模式
        const isSortMode = dragItem && !isWidget(dragItem);
        // const items = layout.getLayoutChildren(data.id);

        return connectDropTarget(
            <div className={cx({
                "widget-preview-item-wrapper": true,
                "droppable": isOver,
                "dragging": isDragging,
                // "drop-tips": canDrop,
            })}>
                {placeholderPosition === 'top' && isOver && !isSortMode ? <WidgetPlaceholderItem /> : null}
                <div
                    ref={connectDragSource}
                    className={cx({
                        "widget-preview-item": true,
                        "widget-preview-item-selected": activeId === item.fieldId,
                    })}
                    onClick={this.handlePreviewClick.bind(this, item)}
                >
                    <DefaultPreview {...item} />
                    <span className="widget-preview-close" onClick={this.handleRemove}>x</span>
                </div>
                {placeholderPosition === 'bottom' && isOver && !isSortMode ? <WidgetPlaceholderItem /> : null}
            </div>
        );
    }
}

export default flow(
    DropTarget(Types.WidgetComponent, dropSpec, dropCollect),
    DragSource(Types.WidgetComponent, dragSpec, dragCollect),
)(WidgetPreviewItem)