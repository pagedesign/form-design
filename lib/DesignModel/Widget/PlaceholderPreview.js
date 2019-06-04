
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
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