
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

var _react = _interopRequireDefault(require("react"));

var _reactIs = require("react-is");

var _Preview = _interopRequireDefault(require("./Preview"));

var _DragPreview = _interopRequireDefault(require("./DragPreview"));

var _PlaceholderPreview = _interopRequireDefault(require("./PlaceholderPreview"));

var _WidgetProperty = _interopRequireDefault(require("./WidgetProperty"));

var Widget =
/*#__PURE__*/
function () {
  /**
       *
       * @param {object} options 控件基本信息: 名称 图标 属性面板组件 预览组件 属性等
       * @param {string} optopns.xtype 控件ID
       * @param {string} optopns.title 控件名称
       * @param {string} optopns.icon  控件图标
       * @param {ReactElementType} optopns.Preview  控件拖放后预览组件
       * @param {ReactElementType} optopns.DragPreview  控件拖拽时预览组件
       * @param {ReactElementType} optopns.PlaceholderPreview  控件拖拽时占位预览组件
       * @param {ReactElementType} optopns.WidgetProperty  控件属性面板组件
       * @param {function|object} optopns.data 控件属性
       * @memberof WidgetManager
       */
  function Widget() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Widget);
    this.$$widget = true;
    this.options = options;
    this.xtype = options.xtype;
    this.title = options.title;
    this.icon = options.icon;
    this.Preview = (0, _reactIs.isValidElementType)(options.Preview) ? options.Preview : _Preview["default"];
    this.DragPreview = (0, _reactIs.isValidElementType)(options.DragPreview) ? options.DragPreview : _DragPreview["default"];
    this.PlaceholderPreview = (0, _reactIs.isValidElementType)(options.PlaceholderPreview) ? options.PlaceholderPreview : _PlaceholderPreview["default"];
    this.WidgetProperty = (0, _reactIs.isValidElementType)(options.WidgetProperty) ? options.WidgetProperty : _WidgetProperty["default"];
  }

  (0, _createClass2["default"])(Widget, [{
    key: "getItem",
    value: function getItem() {
      var data = this.options.data;
      var ret = typeof data === 'function' ? data() : data;
      return (0, _objectSpread2["default"])({}, ret, {
        xtype: this.xtype
      });
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.options[name];
    }
  }, {
    key: "set",
    value: function set(name, value) {
      this.options[name] = value;
      return this;
    }
  }]);
  return Widget;
}();

exports["default"] = Widget;