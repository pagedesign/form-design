
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

var _reactDom = require("react-dom");

var _flow = _interopRequireDefault(require("lodash/flow"));

var _get = _interopRequireDefault(require("lodash/get"));

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

var dropSpec = {
  canDrop: function canDrop(props, monitor, component) {
    var dragItem = monitor.getItem();
    if (dragItem.isWidgetDragging) return true;
    return props.item.fieldId !== dragItem.item.fieldId;
  },
  hover: function hover(props, monitor, component) {
    var placeholderPosition = component.state.placeholderPosition;
    var designer = component.context;
    var item = props.item;
    var dragItem = monitor.getItem();
    var dragItemFieldId = dragItem.item.fieldId;
    var isSortMode = false;

    if (!dragItem.isWidgetDragging) {
      isSortMode = true;
    }

    var dragOffset = monitor.getClientOffset();
    var previewDOM = (0, _reactDom.findDOMNode)(component);

    if (isSortMode) {
      //顺序调整模式
      if (item.fieldId === dragItemFieldId) {
        return;
      } else {
        var targetOffset = previewDOM.querySelector('.widget-preview-item').getBoundingClientRect();
        var middleY = targetOffset.bottom - targetOffset.height / 2;

        if (dragOffset.y <= middleY) {
          designer.insertBefore(dragItem.item, item.fieldId);
        } else {
          designer.insertAfter(dragItem.item, item.fieldId);
        }
      }
    } else {
      //新增模式
      var _targetOffset = previewDOM.getBoundingClientRect();

      var _middleY = _targetOffset.bottom - _targetOffset.height / 2;

      var pos = 'none';

      if (dragOffset.y <= _middleY) {
        pos = 'top';
      } else {
        pos = 'bottom';
      } //设置放置位置


      if (placeholderPosition !== pos) {
        dragItem._dropTarget = {
          id: item.fieldId,
          pos: pos
        };
        component.setState({
          placeholderPosition: pos
        });
      }
    }
  },
  drop: function drop(props, monitor, component) {
    var designer = component.context;
    var dragItem = monitor.getItem();

    if (!dragItem.isWidgetDragging) {
      return;
    }

    var dropId = (0, _get["default"])(dragItem, '_dropTarget.id', null);
    var dropPos = (0, _get["default"])(dragItem, '_dropTarget.pos', 'none');
    delete dragItem._dropTarget;

    if (dropId) {
      if (dropPos === 'top') {
        designer.insertBefore(dragItem.item, dropId);
      } else if (dropPos === 'bottom') {
        designer.insertAfter(dragItem.item, dropId);
      } else {
        designer.addItem(dragItem.item);
      }
    } else {
      designer.addItem(dragItem.item);
    }
  }
};

var dropCollect = function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({
      shallow: true
    }),
    canDrop: monitor.canDrop(),
    dragItem: monitor.getItem()
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      placeholderPosition: 'none' //none after before top bottom

    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleRemove", function () {
      var designer = _this.context;
      var item = _this.props.item;
      designer.removeItem(item.fieldId);
    });
    return _this;
  }

  (0, _createClass2["default"])(WidgetPreviewItem, [{
    key: "handlePreviewClick",
    value: function handlePreviewClick(item) {
      var designer = this.context;
      designer.setActiveId(item.fieldId);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          connectDropTarget = _this$props.connectDropTarget,
          connectDragSource = _this$props.connectDragSource,
          isDragging = _this$props.isDragging,
          isOver = _this$props.isOver,
          widget = _this$props.widget,
          item = _this$props.item,
          dragItem = _this$props.dragItem;
      var placeholderPosition = this.state.placeholderPosition;
      var designer = this.context;
      var activeId = designer.getActiveId(); //如果来源不是组建面板,则是排序模式

      var isSortMode = dragItem && !dragItem.isWidgetDragging; // const items = layout.getLayoutChildren(data.id);

      return connectDropTarget(_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "widget-preview-item-wrapper": true,
          "droppable": isOver,
          "dragging": isDragging // "drop-tips": canDrop,

        })
      }, placeholderPosition === 'top' && isOver && !isSortMode ? _react["default"].createElement(widget.PlaceholderPreview, null) : null, _react["default"].createElement("div", {
        ref: connectDragSource,
        className: (0, _classnames["default"])({
          "widget-preview-item": true,
          "widget-preview-item-selected": activeId === item.fieldId
        }),
        onClick: this.handlePreviewClick.bind(this, item)
      }, _react["default"].createElement(widget.Preview, {
        item: item
      }), _react["default"].createElement("span", {
        className: "widget-preview-close",
        onClick: this.handleRemove
      }, "x")), placeholderPosition === 'bottom' && isOver && !isSortMode ? _react["default"].createElement(widget.PlaceholderPreview, null) : null));
    }
  }]);
  return WidgetPreviewItem;
}(_react["default"].Component);

(0, _defineProperty2["default"])(WidgetPreviewItem, "contextType", _DesignContext["default"]);

var _default = (0, _flow["default"])((0, _reactDnd.DropTarget)(_constants.WIDGET_DRAG_DROP_SCOPE, dropSpec, dropCollect), (0, _reactDnd.DragSource)(_constants.WIDGET_DRAG_DROP_SCOPE, dragSpec, dragCollect))(WidgetPreviewItem);

exports["default"] = _default;