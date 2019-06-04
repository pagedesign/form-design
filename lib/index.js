
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _Designer = _interopRequireDefault(require("./Designer"));

var _default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend["default"])(_Designer["default"]);

exports["default"] = _default;