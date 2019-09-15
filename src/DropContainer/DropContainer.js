import React from "react";
import { useDrop } from "react-dnd";
import invariant from "invariant";

import DesignerContext from "../DesignerContext";

function canDrop(pid, item, designer) {
    //子容器拖动过程中不再接受释放处理
    // const pid = props.pid;
    const dragItemFieldId = item.fieldId;
    const targetPids = pid ? designer.getPids(pid) : [];
    pid && targetPids.push(pid);
    //解决父节点拖动到子节点的情况
    return targetPids.indexOf(dragItemFieldId) === -1;
}

function DropContainer({ pid = null, children }) {
    const designer = React.useContext(DesignerContext);

    const items = designer.getItems(pid);

    const [collectedProps, connectDropTarget] = useDrop({
        accept: designer.getScope(),
        canDrop({ item }, monitor) {
            return true;
        },

        hover({ item }, monitor) {
            const isOver = monitor.isOver({ shallow: true });
            if (!isOver) return;

            if (!monitor.canDrop() || !canDrop(pid, item, designer)) return;

            // const pid = props.pid;
            // const dragItem = monitor.getItem();
            // const item = dragItem.item;

            designer.updateItemPid(item, pid);
        },

        drop({ item }, monitor) {
            // const dragItem = monitor.getItem();

            //根节点统一commit
            if (null == pid) {
                designer.commitItem(item);
            }
        },

        collect: monitor => {
            return {
                monitor,
                canDrop: monitor.canDrop(),
                isOver: monitor.isOver(),
                isHover: monitor.isOver({ shallow: true })
            };
        }
    });

    invariant(
        typeof children === "function",
        "DropContainer children must be function!"
    );

    return children(connectDropTarget, {
        items,
        ...collectedProps
    });
}

export default DropContainer;
