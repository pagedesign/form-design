import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom'
import _ from 'lodash'
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from './Types';
import LayoutContext from '../LayoutContext'
import { uuid } from '../utils';
/* global $ */
const dragSpec = {
    beginDrag(props) {
        return props.data;
    },
    endDrag(props, monitor, component) {
        const poninter = component.context.dropPointer;
        poninter.style = {
            display: 'none'
        }
    }
};

const dragCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging,
    };
}

const dropSpec = {
    canDrop(props, monitor, component) {
        //  console.log(props)
        return true;
    },
    hover(props, monitor, component) {
        const dragItem = monitor.getItem();
        const dragOffset = monitor.getClientOffset();
        const dropDOM = findDOMNode(component);
        const poninter = component.context.dropPointer;
        const targetOffset = dropDOM.getBoundingClientRect();
        const dropItem = props.data;
        //console.log(dragItem)
        if (dragItem.id === dropItem.id) {
            return;
        }

        poninter.style = {
            display: 'block'
        }

        const middleY = targetOffset.left + targetOffset.width / 2;

        const offset = {
            left: targetOffset.left - 5,
            top: targetOffset.top + window.pageYOffset,
        }

        if (dragOffset.x < middleY) {
            //   console.log('left');
        } else {
            offset.left = targetOffset.left + targetOffset.width - 5;
            console.log('right')
        }

        $(poninter).offset(offset);

        $(poninter).css({
            height: dropDOM.offsetHeight
        })
        // console.log('hover', monitor.getClientOffset())
    },
    drop(props, monitor, component) {
        const cid = props.data.id;
        const layout = component.context;
        //console.log(monitor.getItem())
        // layout.addLayoutChildren(cid, {
        //     uuid: uuid(),
        //     widget: monitor.getItem(),
        // })
        // return {
        //     ...props
        // };
    }
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }
}

class WidgetDropItem extends React.Component {

    static contextType = LayoutContext;

    render() {
        const { connectDropTarget, connectDragSource, isDragging, isOver, canDrop, data } = this.props;
        const layout = this.context;
        const items = layout.getLayoutChildren(data.id);

        return connectDropTarget(
            <div ref={connectDragSource} className={cx({
                "widget-drop-item": true,
                // "drag-over": isOver,
                // "drop-tips": canDrop,
            })}>
            </div>
        );
    }
}

export default _.flow(
    DragSource(Types.WidgetComponent, dragSpec, dragCollect),
    DropTarget(Types.WidgetComponent, dropSpec, dropCollect)
)(WidgetDropItem)