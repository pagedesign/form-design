
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _DesignContext = _interopRequireDefault(require("../DesignContext"));

// import { getWidgetPropertyPanel } from './widgets';
// import {
//     Form,
//     FormItem,
//     NativeField,
// } from 'components/Form';
var PropertyPanel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(PropertyPanel, _React$Component);

  function PropertyPanel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, PropertyPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(PropertyPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onItemChange", function (item) {
      var designer = _this.context;
      var activeItem = designer.getActiveItem();
      designer.updateItem((0, _objectSpread2["default"])({}, activeItem, item));
    });
    return _this;
  }

  (0, _createClass2["default"])(PropertyPanel, [{
    key: "render",
    value: function render() {
      var designer = this.context;
      var activeItem = designer.getActiveItem();

      if (!activeItem) {
        return _react["default"].createElement("div", {
          className: "property-panel"
        }, _react["default"].createElement("div", {
          style: {
            padding: 30,
            textAlign: 'center'
          }
        }, "\u8BF7\u5148\u9009\u62E9\u63A7\u4EF6"));
      }

      var widget = designer.getWidget(activeItem.xtype);

      if (!widget) {
        return _react["default"].createElement("div", {
          className: "property-panel"
        }, _react["default"].createElement("div", {
          style: {
            padding: 30,
            textAlign: 'center'
          }
        }, "\u65E0."));
      }

      return _react["default"].createElement("div", {
        className: "property-panel"
      }, _react["default"].createElement(widget.WidgetProperty, {
        widget: widget,
        onChange: this.onItemChange,
        item: (0, _objectSpread2["default"])({}, activeItem),
        key: activeItem.fieldId
      }));
    }
  }]);
  return PropertyPanel;
}(_react["default"].Component);

exports["default"] = PropertyPanel;
(0, _defineProperty2["default"])(PropertyPanel, "contextType", _DesignContext["default"]);