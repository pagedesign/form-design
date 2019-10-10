
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _flow = _interopRequireDefault(require("lodash/flow"));

var _reactDnd = require("react-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../constants");

var _DesignContext = _interopRequireDefault(require("../../DesignContext"));

var dragSpec = {
  beginDrag: function beginDrag(props) {
    var widget = props.widget;
    var item = props.item;
    return {
      isWidgetDragging: false,
      isPreviewDragging: false,
      widget: widget,
      item: item
    };
  }
};

var dragCollect = function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

function canDrop(props, monitor) {
  var designer = props.designer;
  var dragItem = monitor.getItem();
  var dragItemFieldId = dragItem.item.fieldId;
  var targetFieldId = props.item.fieldId; //解决父节点拖动到子节点的情况

  var pids = designer.getPids(targetFieldId);
  pids.push(targetFieldId);
  if (pids.indexOf(dragItemFieldId) > -1) return false;
  return true;
}

var dropSpec = {
  canDrop: function canDrop(props, monitor) {
    return true;
  },
  hover: function hover(props, monitor, component) {
    var isOver = monitor.isOver({
      shallow: true
    });
    if (!isOver) return;
    if (!monitor.canDrop() || !canDrop(props, monitor, component)) return;
    var designer = component.context;
    var item = props.item;
    var dragItem = monitor.getItem();
    var dragOffset = monitor.getClientOffset();
    var previewDOM = (0, _reactDom.findDOMNode)(component); //顺序调整

    var targetOffset = previewDOM.getBoundingClientRect();
    var middleY = ~~(targetOffset.bottom - targetOffset.height / 2);

    if (dragOffset.y <= middleY) {
      designer.insertBefore(dragItem.item, item.fieldId);
    } else {
      designer.insertAfter(dragItem.item, item.fieldId);
    }
  }
};

var dropCollect = function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({
      shallow: true
    }),
    canDrop: monitor.canDrop() // dragItem: monitor.getItem(),

  };
};

var WidgetPreviewItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(WidgetPreviewItem, _React$Component);

  function WidgetPreviewItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, WidgetPreviewItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(WidgetPreviewItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {// placeholderPosition: 'none', //none after before top bottom
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleRemove", function () {
      var designer = _this.context;
      var item = _this.props.item;
      designer.removeItem(item.fieldId);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDragAndDrop", function (dom) {
      var _this$props = _this.props,
          connectDropTarget = _this$props.connectDropTarget,
          connectDragSource = _this$props.connectDragSource;
      connectDropTarget(dom);
      connectDragSource(dom);
    });
    return _this;
  }

  (0, _createClass2["default"])(WidgetPreviewItem, [{
    key: "handlePreviewClick",
    value: function handlePreviewClick(item, e) {
      if (e.isDefaultPrevented()) {
        return;
      }

      e.preventDefault();
      var designer = this.context;
      designer.setActiveId(item.fieldId);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          connectDropTarget = _this$props2.connectDropTarget,
          connectDragSource = _this$props2.connectDragSource,
          isDragging = _this$props2.isDragging,
          isOver = _this$props2.isOver,
          widget = _this$props2.widget,
          item = _this$props2.item,
          visible = _this$props2.visible; // const { placeholderPosition } = this.state;

      var designer = this.context;
      var activeId = designer.getActiveId(); //如果来源不是组建面板,则是排序模式
      // const isSortMode = dragItem && !dragItem.isWidgetDragging;
      // const items = layout.getLayoutChildren(data.id);

      return _react["default"].createElement("div", {
        ref: this.handleDragAndDrop,
        className: (0, _classnames["default"])({
          "widget-preview-item-wrapper": true,
          "droppable": isOver,
          "dragging": isDragging // "drop-tips": canDrop,

        }),
        style: {
          display: visible ? 'inline-block' : 'none',
          width: item.width || '100%'
        }
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "widget-preview-item": true,
          "widget-preview-item-selected": activeId === item.fieldId
        }),
        onClick: this.handlePreviewClick.bind(this, item)
      }, _react["default"].createElement(widget.Preview, {
        item: item,
        designer: designer
      }), _react["default"].createElement("span", {
        className: "widget-preview-close",
        onClick: this.handleRemove
      }, "x")));
    }
  }]);
  return WidgetPreviewItem;
}(_react["default"].Component);

(0, _defineProperty2["default"])(WidgetPreviewItem, "contextType", _DesignContext["default"]);

var _default = (0, _flow["default"])((0, _reactDnd.DropTarget)(_constants.WIDGET_DRAG_DROP_SCOPE, dropSpec, dropCollect), (0, _reactDnd.DragSource)(_constants.WIDGET_DRAG_DROP_SCOPE, dragSpec, dragCollect))(WidgetPreviewItem);

exports["default"] = _default;