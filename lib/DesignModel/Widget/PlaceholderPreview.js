
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WidgetPlaceholderItem;

var _react = _interopRequireDefault(require("react"));

function WidgetPlaceholderItem() {
  return _react["default"].createElement("div", {
    className: "drag-item-placeholder"
  }, _react["default"].createElement("div", {
    className: "drag-item-placeholder-inner"
  }));
}