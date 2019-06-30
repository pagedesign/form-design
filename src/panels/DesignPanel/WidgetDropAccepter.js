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

function canDrop(props, monitor, component) {
    //子容器拖动过程中不再接受释放处理
    const designer = component.context;
    const dragItem = monitor.getItem();
    const pid = props.pid;
    const dragItemFieldId = dragItem.item.fieldId;
    const targetPids = pid ? designer.getPids(pid) : [];
    pid && targetPids.push(pid);
    //解决父节点拖动到子节点的情况
    return targetPids.indexOf(dragItemFieldId) === -1;
}

const spec = {
    canDrop(props, monitor) {
        return true;
    },
    hover(props, monitor, component) {
        const isOver = monitor.isOver({ shallow: true });
        if (!isOver) return;

        if (!monitor.canDrop() || !canDrop(props, monitor, component)) return;

        const designer = component.context;
        const pid = props.pid;
        const dragItem = monitor.getItem();
        const item = dragItem.item;

        designer.updateItemPid(item, pid);
    },
    drop(props, monitor, component) {
        const dragItem = monitor.getItem();
        const designer = component.context;

        //根节点统一commit
        if (props.pid == null) {
            designer.commitItem(dragItem.item);
        }

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
        const shouldHide = !isHover && designer.isTmpItem(item)

        const xtype = item.xtype;
        const widget = designer.getWidget(xtype);

        return (
            <PreviewItem
                designer={designer}
                key={item.fieldId}
                widget={widget}
                item={item}
                visible={!shouldHide}
            />
        )
    }

    // connectDropTarget = (dom) => {
    //     const { connectDropTarget, pid } = this.props;
    //     const designer = this.context;

    //     if (pid) {
    //         const pItem = designer.getItem(pid);
    //         if (!designer.isTmpItem(pItem)) {
    //             connectDropTarget(dom);
    //         } else {
    //             const tmpDOM = document.createElement('div');
    //             connectDropTarget(tmpDOM);
    //             console.log('x')
    //         }
    //     } else {
    //         connectDropTarget(dom);
    //     }
    // }

    render() {
        const { connectDropTarget, isOver, canDrop, dragItem, items, style = {} } = this.props;
        // const designer = this.context;
        // const items = designer.getItems(pid);

        return (
            <div
                ref={connectDropTarget}
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