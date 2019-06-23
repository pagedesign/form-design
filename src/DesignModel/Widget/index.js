
import React from 'react';
import { isValidElementType } from 'react-is';
import WPreview from './Preview';
import WDragPreview from './DragPreview';
import WPlaceholderPreview from './PlaceholderPreview';
import WWidgetProperty from './WidgetProperty';

export default class Widget {
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
    constructor(options = {}) {
        this.$$widget = true;
        this.options = options;

        this.xtype = options.xtype;
        this.title = options.title;
        this.icon = options.icon;

        this.Preview = isValidElementType(options.Preview) ? options.Preview : WPreview;
        this.DragPreview = isValidElementType(options.DragPreview) ? options.DragPreview : WDragPreview;
        this.PlaceholderPreview = isValidElementType(options.PlaceholderPreview) ? options.PlaceholderPreview : WPlaceholderPreview;
        this.WidgetProperty = isValidElementType(options.WidgetProperty) ? options.WidgetProperty : WWidgetProperty;

    }

    getItem() {
        const data = this.options.data;
        const ret = typeof data === 'function' ? data() : data;

        return {
            ...ret,
            xtype: this.xtype,
            __tmp__: true,
            $pid: null,
        }
    }

    get(name) {
        return this.options[name];
    }

    set(name, value) {
        this.options[name] = value;

        return this;
    }

}