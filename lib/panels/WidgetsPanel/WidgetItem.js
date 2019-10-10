
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../constants");

var spec = {
  beginDrag: function beginDrag(props, monitor, component) {
    var designer = props.designer;
    var widget = props.widget;
    var item = widget.getItem();
    designer.addItem(item);
    return {
      widget: widget,
      item: item
    };
  },
  endDrag: function endDrag(props, monitor, component) {
    var designer = props.designer;
    designer.clearTmpItems();
  } // canDrag(props) {
  //     return !props.disabled;
  // }

};

var collect = function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var WidgetItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(WidgetItem, _React$Component);

  function WidgetItem() {
    (0, _classCallCheck2["default"])(this, WidgetItem);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WidgetItem).apply(this, arguments));
  }

  (0, _createClass2["default"])(WidgetItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          widget = _this$props.widget,
          connectDragSource = _this$props.connectDragSource,
          isDragging = _this$props.isDragging;
      var _widget$title = widget.title,
          title = _widget$title === void 0 ? "未知组件" : _widget$title,
          icon = widget.icon;
      return connectDragSource(_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "widget-item": true,
          "widget-item-dragging": isDragging,
          "widget-item-disabled": disabled
        })
      }, _react["default"].createElement("div", {
        className: "widget-item-title"
      }, _react["default"].createElement("img", {
        src: icon
      }), _react["default"].createElement("span", {
        className: "widget-text"
      }, title))));
    }
  }]);
  return WidgetItem;
}(_react["default"].Component);

var _default = (0, _reactDnd.DragSource)(_constants.WIDGET_DRAG_DROP_SCOPE, spec, collect)(WidgetItem);

exports["default"] = _default;