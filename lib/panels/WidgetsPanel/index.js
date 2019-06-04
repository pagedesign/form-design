
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _DesignContext = _interopRequireDefault(require("../../DesignContext"));

var _WidgetItem = _interopRequireDefault(require("./WidgetItem"));

var WidgetsPanel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(WidgetsPanel, _React$Component);

  function WidgetsPanel() {
    (0, _classCallCheck2["default"])(this, WidgetsPanel);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WidgetsPanel).apply(this, arguments));
  }

  (0, _createClass2["default"])(WidgetsPanel, [{
    key: "render",
    value: function render() {
      var designer = this.context;
      var widgets = designer.getWidgets();
      return _react["default"].createElement("div", {
        className: "widgets-panel"
      }, _react["default"].createElement("div", {
        className: "widgets-panel-header"
      }, "\u63A7\u4EF6\u5217\u8868"), _react["default"].createElement("div", {
        className: "widgets-panel-body"
      }, widgets.map(function (widget) {
        return _react["default"].createElement(_WidgetItem["default"], {
          key: widget.xtype,
          widget: widget
        });
      })));
    }
  }]);
  return WidgetsPanel;
}(_react["default"].Component);

exports["default"] = WidgetsPanel;
(0, _defineProperty2["default"])(WidgetsPanel, "contextType", _DesignContext["default"]);