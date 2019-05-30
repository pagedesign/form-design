import React from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from '../common/WidgetTypes';
import { uuid } from '../utils';
import {
    WidgetPreviewItem,
    WidgetPlaceholderItem,
    isWidget
} from '../widgets';
import LayoutContext from '../LayoutContext';

const spec = {
    canDrop(props, monitor) {
        const item = monitor.getItem();
        return isWidget(item);
    },
    hover() {
        console.log('container over...')
    },
    drop(props, monitor, component) {
        // console.log('drop')
        if (monitor.didDrop()) {
            console.log('has did drop')
            return;
        }
        const widget = monitor.getItem();
        // console.log(111)
        // const cid = props.data.id;
        const designer = component.context;
        //console.log(monitor.getItem())
        designer.addItem(widget.props)
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

class DropContainer extends React.Component {

    static contextType = LayoutContext;

    rendrePlaceholder() {
        return (
            <WidgetPlaceholderItem />
        );
    }

    render() {
        const { connectDropTarget, isOver, canDrop, dragItem } = this.props;
        const designer = this.context;
        const items = designer.getItems();
        console.log('dp c')
        return connectDropTarget(
            <div className={cx({
                "design-layout-container": true,
                "drag-over": isOver,
                "dropable": canDrop,
            })}>
                {
                    items.map((item, i) => {
                        return <WidgetPreviewItem item={item} key={item.fieldId} />
                    })
                }
                {
                    isOver && isWidget(dragItem) ? this.rendrePlaceholder() : null
                }
            </div>
        );
    }
}

export default DropTarget(Types.WidgetComponent, spec, collect)(DropContainer);