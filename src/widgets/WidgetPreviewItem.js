import React from 'react';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from '../common/WidgetTypes';
import WidgetPlaceholderItem from './WidgetPlaceholderItem';
import LayoutContext from '../LayoutContext'
// import { uuid } from '../utils';
/* global $ */
const dragSpec = {
    beginDrag(props) {
        console.log('beginDrag, xx')
        console.log(props)
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
        isDragging: monitor.isDragging,
    };
}

const dropSpec = {

    canDrop(props, monitor, component) {
        //  console.log(props)
        // console.log('canDrop')
        return true;
    },
    hover(props, monitor, component) {
        console.log('drag item over')
        const { placeholderPosition } = component.state;

        const dragItem = monitor.getItem();
        const dragOffset = monitor.getClientOffset();
        const previewDOM = findDOMNode(component);
        const targetOffset = previewDOM.getBoundingClientRect();

        const middleY = targetOffset.bottom - (targetOffset.height / 2);

        let pos = 'none';

        if (dragOffset.y <= middleY) {
            pos = 'top';
        } else {
            pos = 'bottom';
        }

        if (placeholderPosition !== pos) {
            component.setState({
                placeholderPosition: pos
            });
        }

        // console.log(dragOffset)

        // return;

        // const dropItem = props.data;
        // //console.log(dragItem)
        // if (dragItem.id === dropItem.id) {
        //     return;
        // }



        // // const middleY = targetOffset.left + targetOffset.width / 2;
        // // const middleX = targetOffset.left + targetOffset.width / 2;

        // const offset = {
        //     left: targetOffset.left - 5,
        //     top: targetOffset.top + window.pageYOffset,
        // }

        // if (dragOffset.x < middleY) {
        //     //   console.log('left');
        // } else {
        //     offset.left = targetOffset.left + targetOffset.width - 5;
        //     console.log('right')
        // }

        // $(poninter).offset(offset);

        // $(poninter).css({
        //     height: dropDOM.offsetHeight
        // })
        // // console.log('hover', monitor.getClientOffset())
    },
    drop(props, monitor, component) {
        // return;
        // const cid = props.data.id;
        const designer = component.context;
        // console('drag???')
        designer.addItem({});
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

class WidgetPreviewItem extends React.Component {

    static contextType = LayoutContext;

    state = {
        placeholderPosition: 'none', //none after before top bottom
    }

    render() {
        const { connectDropTarget, connectDragSource, isDragging, isOver, canDrop, data } = this.props;
        const { placeholderPosition } = this.state;
        // const layout = this.context;
        // const items = layout.getLayoutChildren(data.id);
        console.log('isOver', isOver)

        return connectDropTarget(
            <div ref={connectDragSource} className={cx({
                "widget-preview-item": true,
                "droppable": isOver,
                // "drop-tips": canDrop,
            })}>
                {placeholderPosition === 'top' && isOver ? <WidgetPlaceholderItem /> : null}
                <div className="widget-preview-item-inner">
                    NOBO-TEST
                </div>
                {placeholderPosition === 'bottom' && isOver ? <WidgetPlaceholderItem /> : null}
            </div>
        );

        // return (
        //     <>
        //         {placeholderPosition === 'top' && isOver ? <WidgetPlaceholderItem /> : null}
        //         {
        //             connectDropTarget(
        //                 <div ref={connectDragSource} className={cx({
        //                     "widget-preview-item": true,
        //                     "droppable": isOver,
        //                     // "drop-tips": canDrop,
        //                 })}>
        //                     <div className="widget-preview-item-inner">
        //                         NOBO-TEST
        //                     </div>
        //                 </div>
        //             )
        //         }
        //         {placeholderPosition === 'bottom' && isOver ? <WidgetPlaceholderItem /> : null}
        //     </>
        // );


    }
}

export default flow(
    DropTarget(Types.WidgetComponent, dropSpec, dropCollect),
    DragSource(Types.WidgetComponent, dragSpec, dragCollect),
)(WidgetPreviewItem)