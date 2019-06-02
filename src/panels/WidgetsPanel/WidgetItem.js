import React from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import {
    WIDGET_DRAG_DROP_SCOPE
} from '../../constants';

const spec = {
    beginDrag(props) {
        const widget = props.widget;
        const item = widget.getItem();
        return {
            isWidgetDragging: true,
            widget,
            item,
        };
    },
    // endDrag(props, monitor, component) {
    //     console.log('endDrag')
    // },
    // canDrag(props) {
    //     return !props.disabled;
    // }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
};

class WidgetItem extends React.Component {

    render() {
        const { disabled, widget, connectDragSource, isDragging } = this.props;
        const { title = "未知组件", icon } = widget;
        return connectDragSource(
            <div className={cx({
                "widget-item": true,
                "widget-item-dragging": isDragging,
                "widget-item-disabled": disabled,
            })}>
                <div className="widget-item-title">
                    <img src={icon} />
                    <span className="widget-text">{title}</span>
                </div>
            </div>
        );
    }
}

export default DragSource(WIDGET_DRAG_DROP_SCOPE, spec, collect)(WidgetItem);