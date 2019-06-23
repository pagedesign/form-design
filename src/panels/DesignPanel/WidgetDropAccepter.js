import React from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import {
    WIDGET_DRAG_DROP_SCOPE
} from '../../constants';
import DesignContext from '../../DesignContext';

import PreviewItem from './PreviewItem';

const spec = {
    canDrop(props, monitor) {
        return true;
        const dragItem = monitor.getItem();
        return dragItem.isWidgetDragging;
    },
    hover(props, monitor, component) {
        if (!monitor.canDrop()) return;
        const isOver = monitor.isOver({ shallow: true });
        if (isOver) {
            const designer = component.context;
            const pid = props.pid;
            const dragItem = monitor.getItem();
            const item = dragItem.item;

            if (pid !== item.$pid) {
                designer.updateItemPid(item, pid)
                console.log('pid change\...')
            }

        }
    },
    drop(props, monitor, component) {
        if (monitor.didDrop() || !monitor.canDrop()) {
            console.log('widget has did drop')
            return;
        }
        console.log('WidgetDropAccepter dropable')
        const dragItem = monitor.getItem();
        const designer = component.context;
        console.log('drop', props.pid);
        // if (designer.isTmpItem(dragItem.item)) {
        // designer.addItem(dragItem.item, props.pid);
        designer.commitItem(dragItem.item, props.pid)
        // }
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isHover: monitor.isOver(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        dragItem: monitor.getItem(),
    }
}

class WidgetDropAccepter extends React.Component {

    static contextType = DesignContext;

    static defaultProps = {
        pid: null,
    }

    rendrePlaceholder() {
        const { dragItem } = this.props;
        const { widget, item } = dragItem

        return (
            <widget.PlaceholderPreview widget={widget} item={item} />
        );
    }

    renderItem = (item, i) => {
        const { isHover } = this.props;
        const designer = this.context;

        if (!isHover && designer.isTmpItem(item)) {
            return null;
        }

        const xtype = item.xtype;
        const widget = designer.getWidget(xtype);

        return <PreviewItem designer={designer} key={item.fieldId} widget={widget} item={item} />
    }

    render() {
        const { connectDropTarget, isOver, canDrop, dragItem, items, style = {} } = this.props;
        // const designer = this.context;
        // const items = designer.getItems(pid);

        return connectDropTarget(
            <div
                style={style}
                className={cx({
                    "design-layout-container": true,
                    "drag-over": isOver,
                    "dropable": canDrop,
                })}>
                {
                    items.map(this.renderItem)
                }
                {/* {
                    isOver && dragItem.isWidgetDragging ? this.rendrePlaceholder() : null
                } */}
            </div>
        );
    }
}

export default DropTarget(WIDGET_DRAG_DROP_SCOPE, spec, collect)(WidgetDropAccepter);