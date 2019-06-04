
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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../constants");

var _DesignContext = _interopRequireDefault(require("../../DesignContext"));

var _PreviewItem = _interopRequireDefault(require("./PreviewItem"));

var spec = {
  canDrop: function canDrop(props, monitor) {
    var dragItem = monitor.getItem();
    return dragItem.isWidgetDragging; // return isWidget(item);
  },
  // hover() {
  //     console.log('WidgetDropAccepter over...')
  // },
  drop: function drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // console.log('widget has did drop')
      return;
    }

    var dragItem = monitor.getItem();
    var designer = component.context;
    designer.addItem(dragItem.item);
  }
};

var collect = function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({
      shallow: true
    }),
    canDrop: monitor.canDrop(),
    dragItem: monitor.getItem()
  };
};

var WidgetDropAccepter =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(WidgetDropAccepter, _React$Component);

  function WidgetDropAccepter() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, WidgetDropAccepter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(WidgetDropAccepter)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderItem", function (item, i) {
      var designer = _this.context;
      var xtype = item.xtype;
      var widget = designer.getWidget(xtype);
      return _react["default"].createElement(_PreviewItem["default"], {
        key: item.fieldId,
        widget: widget,
        item: item
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(WidgetDropAccepter, [{
    key: "rendrePlaceholder",
    value: function rendrePlaceholder() {
      var dragItem = this.props.dragItem;
      var widget = dragItem.widget,
          item = dragItem.item;
      return _react["default"].createElement(widget.PlaceholderPreview, {
        widget: widget,
        item: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          connectDropTarget = _this$props.connectDropTarget,
          isOver = _this$props.isOver,
          canDrop = _this$props.canDrop,
          dragItem = _this$props.dragItem;
      var designer = this.context;
      var items = designer.getItems();
      return connectDropTarget(_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "design-layout-container": true,
          "drag-over": isOver,
          "dropable": canDrop
        })
      }, items.map(this.renderItem), isOver && dragItem.isWidgetDragging ? this.rendrePlaceholder() : null));
    }
  }]);
  return WidgetDropAccepter;
}(_react["default"].Component);

(0, _defineProperty2["default"])(WidgetDropAccepter, "contextType", _DesignContext["default"]);

var _default = (0, _reactDnd.DropTarget)(_constants.WIDGET_DRAG_DROP_SCOPE, spec, collect)(WidgetDropAccepter);

exports["default"] = _default;