import React from 'react';
import DesignContext from '../DesignContext';
import Widget from './Widget';

// import { isWidget } from '../utils'

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

export default class DesignModel extends React.Component {
    static getDerivedStateFromProps(props, state) {

        const widgetsMap = {};
        const widgets = props.widgets.map(widget => {
            const w = new Widget(widget);
            widgetsMap[widget.xtype] = w;
            return w;
        });

        return {
            widgets,
            widgetsMap,
            items: props.items || [],
        }
    }

    static defaultProps = {
        onChange: null,
        widgets: [],
        widgetsMap: {},
        items: [],
    }

    state = {
        widgets: [],
        widgetsMap: {},
        items: [],
        activeId: null
    }

    onChange(items) {
        const props = this.props;
        const { onChange } = props;

        if (onChange) {
            onChange(items);
        }
    }

    getWidget(xtype) {
        const { widgetsMap } = this.state;
        return widgetsMap[xtype] || null;
    }

    isWidget(widget) {
        return !!widget.$$widget;
    }

    getWidgets() {
        const { widgets } = this.state;
        return [].concat(widgets);
    }

    setActiveId(activeId) {
        this.setState({
            activeId
        });
    }

    getActiveId() {
        return this.state.activeId;
    }

    getActiveItem() {
        const activeId = this.state.activeId;

        return this.getItem(activeId) || null;
    }

    getItems() {
        return [...this.state.items];
    }

    updateItem(item) {
        const items = this.getItems();
        const fieldId = item.fieldId;
        const idx = this.getItemIndex(fieldId);

        if (idx !== -1) {
            items[idx] = item;
        }

        this.onChange(items);
    }

    addItem(item) {
        const items = this.getItems();

        // item = isWidget(item) ? item.getData() : item;

        items.push(item);

        this.onChange(items);
    }

    removeItem(fieldId) {
        const items = this.getItems();
        const ret = items.filter(item => item.fieldId !== fieldId);

        this.onChange(ret);
    }

    getItemIndex(fieldId) {
        const items = this.getItems();
        return findIndex(items, item => item.fieldId === fieldId)
    }

    getItem(fieldId) {
        const items = this.getItems();
        return find(items, item => item.fieldId === fieldId)
    }

    insertBefore(item, fieldId) {
        const items = this.getItems();
        console.log('insertBefore')

        //判断当前item是否已经存在, 如果存在则先删除
        const oIdx = this.getItemIndex(item.fieldId);
        if (oIdx > -1) {
            console.log('执行移动操作')
            items.splice(oIdx, 1);
        } else {
            console.log('执行插入操作')
        }

        //插入操作
        const idx = this.getItemIndex(fieldId);
        items.splice(idx, 0, item);

        this.onChange(items);
    }

    insertAfter(item, fieldId) {
        const items = this.getItems();
        console.log('insertAfter')

        //判断当前item是否已经存在, 如果存在则先删除
        const oIdx = this.getItemIndex(item.fieldId);
        if (oIdx > -1) {
            items.splice(oIdx, 1);
        }

        //插入操作
        const idx = this.getItemIndex(fieldId);
        items.splice(idx, 1, items[idx], item);

        this.onChange(items);
    }

    getModel() {
        return {
            isWidget: this.isWidget.bind(this),
            getWidget: this.getWidget.bind(this),
            getWidgets: this.getWidgets.bind(this),
            setActiveId: this.setActiveId.bind(this),
            getActiveId: this.getActiveId.bind(this),
            getActiveItem: this.getActiveItem.bind(this),
            addItem: this.addItem.bind(this),
            updateItem: this.updateItem.bind(this),
            getItems: this.getItems.bind(this),
            removeItem: this.removeItem.bind(this),
            getItemIndex: this.getItemIndex.bind(this),
            getItem: this.getItem.bind(this),
            insertBefore: this.insertBefore.bind(this),
            insertAfter: this.insertAfter.bind(this),
        };
    }

    render() {
        const { children } = this.props;
        return (
            <DesignContext.Provider value={this.getModel()}>
                {children}
            </DesignContext.Provider>
        )
    }
}