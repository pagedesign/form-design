export default function canDrop(props, monitor) {
    const designer = props.designer;
    const dragItem = monitor.getItem();
    const dragItemFieldId = dragItem.item.fieldId;
    const targetFieldId = props.item.fieldId;
    const pids = designer.getPids(targetFieldId);
    //解决父节点拖动到子节点的情况
    if (pids.indexOf(dragItemFieldId) > -1) return false;

    return targetFieldId !== dragItemFieldId;
}