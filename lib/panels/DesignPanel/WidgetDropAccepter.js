
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

var _reactDnd = require("react-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../constants");

var _DesignContext = _interopRequireDefault(require("../../DesignContext"));

var _PreviewItem = _interopRequireDefault(require("./PreviewItem"));

function canDrop(props, monitor, component) {
  //子容器拖动过程中不再接受释放处理
  var designer = component.context;
  var dragItem = monitor.getItem();
  var pid = props.pid;
  var dragItemFieldId = dragItem.item.fieldId;
  var targetPids = pid ? designer.getPids(pid) : [];
  pid && targetPids.push(pid); //解决父节点拖动到子节点的情况

  return targetPids.indexOf(dragItemFieldId) === -1;
}

var spec = {
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
    var pid = props.pid;
    var dragItem = monitor.getItem();
    var item = dragItem.item;
    designer.updateItemPid(item, pid);
  },
  drop: function drop(props, monitor, component) {
    var dragItem = monitor.getItem();
    var designer = component.context; //根节点统一commit

    if (props.pid == null) {
      designer.commitItem(dragItem.item);
    }
  }
};

var collect = function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isHover: monitor.isOver(),
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
      var isHover = _this.props.isHover;
      var designer = _this.context;
      var shouldHide = !isHover && designer.isTmpItem(item);
      var xtype = item.xtype;
      var widget = designer.getWidget(xtype);
      return _react["default"].createElement(_PreviewItem["default"], {
        designer: designer,
        key: item.fieldId,
        widget: widget,
        item: item,
        visible: !shouldHide
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
    // connectDropTarget = (dom) => {
    //     const { connectDropTarget, pid } = this.props;
    //     const designer = this.context;
    //     if (pid) {
    //         const pItem = designer.getItem(pid);
    //         if (!designer.isTmpItem(pItem)) {
    //             connectDropTarget(dom);
    //         } else {
    //             const tmpDOM = document.createElement('div');
    //             connectDropTarget(tmpDOM);
    //             console.log('x')
    //         }
    //     } else {
    //         connectDropTarget(dom);
    //     }
    // }
    value: function render() {
      var _this$props = this.props,
          connectDropTarget = _this$props.connectDropTarget,
          isOver = _this$props.isOver,
          canDrop = _this$props.canDrop,
          dragItem = _this$props.dragItem,
          items = _this$props.items,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style; // const designer = this.context;
      // const items = designer.getItems(pid);

      return _react["default"].createElement("div", {
        ref: connectDropTarget,
        style: style,
        className: (0, _classnames["default"])({
          "design-layout-container": true,
          "drag-over": isOver,
          dropable: canDrop
        })
      }, items.map(this.renderItem));
    }
  }]);
  return WidgetDropAccepter;
}(_react["default"].Component);

(0, _defineProperty2["default"])(WidgetDropAccepter, "contextType", _DesignContext["default"]);
(0, _defineProperty2["default"])(WidgetDropAccepter, "defaultProps", {
  pid: null
});

var _default = (0, _reactDnd.DropTarget)(_constants.WIDGET_DRAG_DROP_SCOPE, spec, collect)(WidgetDropAccepter);

exports["default"] = _default;