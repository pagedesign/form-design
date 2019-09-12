import React from "react";
import { useDrop } from "react-dnd";
import invariant from "invariant";

import DesignerContext from "../DesignerContext";

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

function DropContainer({ children }) {
    const designer = React.useContext(DesignerContext);
    const [collectedProps, connectDropTarget] = useDrop({
        accept: designer.getScope(),
        canDrop(props, monitor) {
            return true;
        },
        hover(props, monitor) {
            const isOver = monitor.isOver({ shallow: true });
            if (!isOver) return;

            if (!monitor.canDrop() || !canDrop(props, monitor, component))
                return;

            const pid = props.pid;
            const dragItem = monitor.getItem();
            const item = dragItem.item;

            designer.updateItemPid(item, pid);
        },
        drop(props, monitor) {
            const dragItem = monitor.getItem();

            //根节点统一commit
            if (props.pid == null) {
                designer.commitItem(dragItem.item);
            }
        },
        collect: (connect, monitor) => {
            return {
                monitor
            };
        }
    });

    invariant(
        typeof children !== "function",
        "DropContainer children must be function!"
    );

    return children(connectDropTarget, collectedProps);
}

export default DropContainer;
