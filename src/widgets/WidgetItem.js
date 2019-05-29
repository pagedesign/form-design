import React from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from '../common/WidgetTypes';

const spec = {
    beginDrag(props) {
        return Object.assign({ _isNew: true }, props.widget);
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
        isDragging: monitor.isDragging,
    };
};

class WidgetItem extends React.Component {

    render() {
        const { disabled, widget, connectDragSource, isDragging } = this.props;
        const { cmpid, title = "未知组件", icon } = widget;
        return connectDragSource(
            <div className={cx({
                "widget-item": true,
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

export default DragSource(Types.WidgetComponent, spec, collect)(WidgetItem);