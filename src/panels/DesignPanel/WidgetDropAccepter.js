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
        const dragItem = monitor.getItem();
        return dragItem.isWidgetDragging;
        // return isWidget(item);
    },
    // hover(props, monitor, component) {
    //     const isOver = monitor.isOver({ shallow: true });
    //     if (isOver) {
    //         console.log('WidgetDropAccepter over...')
    //     }
    // },
    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            // console.log('widget has did drop')
            return;
        }
        const dragItem = monitor.getItem();
        const designer = component.context;
        console.log(props.pid)
        designer.addItem(dragItem.item, props.pid);
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
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
        const designer = this.context;
        const xtype = item.xtype;
        const widget = designer.getWidget(xtype);

        return <PreviewItem key={item.fieldId} widget={widget} item={item} />
    }

    render() {
        const { connectDropTarget, isOver, canDrop, dragItem, items } = this.props;
        // const designer = this.context;
        // const items = designer.getItems(pid);

        return connectDropTarget(
            <div className={cx({
                "design-layout-container": true,
                "drag-over": isOver,
                "dropable": canDrop,
            })}>
                {
                    items.map(this.renderItem)
                }
                {
                    isOver && dragItem.isWidgetDragging ? this.rendrePlaceholder() : null
                }
            </div>
        );
    }
}

export default DropTarget(WIDGET_DRAG_DROP_SCOPE, spec, collect)(WidgetDropAccepter);