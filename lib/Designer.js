
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _DesignModel = _interopRequireDefault(require("./DesignModel"));

var _WidgetsPanel = _interopRequireDefault(require("./panels/WidgetsPanel"));

var _PropertyPanel = _interopRequireDefault(require("./panels/PropertyPanel"));

var _DesignPanel = _interopRequireDefault(require("./panels/DesignPanel"));

var _constants = require("./constants");

var Designer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Designer, _React$Component);

  function Designer() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Designer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Designer)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleModelChange", function (items) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          metadata = _this$props.metadata;
      onChange && onChange((0, _objectSpread2["default"])({}, metadata, {
        items: items
      }));
    });
    return _this;
  }

  (0, _createClass2["default"])(Designer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          widgets = _this$props2.widgets,
          metadata = _this$props2.metadata,
          platform = _this$props2.platform;
      return _react["default"].createElement(_reactDnd.DndProvider, {
        backend: _reactDndHtml5Backend["default"]
      }, _react["default"].createElement(_DesignModel["default"], {
        widgets: widgets,
        items: metadata.items,
        platform: platform,
        onChange: this.handleModelChange
      }, _react["default"].createElement("div", {
        className: "csos-form-designer"
      }, _react["default"].createElement("div", {
        className: "csos-form-designer-container"
      }, _react["default"].createElement(_WidgetsPanel["default"], null), _react["default"].createElement(_DesignPanel["default"], null), _react["default"].createElement(_PropertyPanel["default"], null)))));
    }
  }]);
  return Designer;
}(_react["default"].Component);

exports["default"] = Designer;
(0, _defineProperty2["default"])(Designer, "propTypes", {
  widgets: _propTypes["default"].array,
  platform: _propTypes["default"].oneOf([_constants.P_PC, _constants.P_MOBILE, _constants.P_IPAD]),
  metadata: _propTypes["default"].object
});
(0, _defineProperty2["default"])(Designer, "defaultProps", {
  onChange: null,
  platform: _constants.P_PC,
  widgets: [],
  metadata: {
    items: []
  }
});