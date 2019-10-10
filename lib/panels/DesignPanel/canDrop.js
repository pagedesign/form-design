
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = canDrop;

function canDrop(props, monitor) {
  var designer = props.designer;
  var dragItem = monitor.getItem();
  var dragItemFieldId = dragItem.item.fieldId;
  var targetFieldId = props.item.fieldId;
  var pids = designer.getPids(targetFieldId); //解决父节点拖动到子节点的情况

  if (pids.indexOf(dragItemFieldId) > -1) return false;
  return targetFieldId !== dragItemFieldId;
}