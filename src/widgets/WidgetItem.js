import React from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from '../common/WidgetTypes';

const spec = {
    beginDrag(props) {
        console.log('beginDrag')
        return props.data;
    },
    endDrag(props, monitor, component) {
        console.log('endDrag')
    },
    canDrag(props) {
        return !props.disabled;
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging,
    };
};

class WidgetItem extends React.Component {

    render() {
        const { disabled, data, connectDragSource, isDragging } = this.props;
        const { cmpid, title = "未知组件" } = data;
        return connectDragSource(
            <div className={cx({
                "widget-item": true,
                "widget-item-disabled": disabled,
            })}>
                {/* <div className="widget-item-icon">
                    <Icon type="pie-chart" theme="filled" />
                </div> */}
                <div className="widget-item-title">
                    {title}
                </div>
            </div>
        );
    }
}

export default DragSource(Types.WidgetComponent, spec, collect)(WidgetItem);