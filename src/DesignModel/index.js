import React from 'react';
import DesignContext from '../DesignContext';
import Widget from './Widget';

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

    getItems(pid = null) {
        const items = this.getAllItems();
        return items.filter(item => item.$pid == pid);
    }

    getAllItems() {
        return [...this.state.items];
    }

    //获取组件的所有父级ID
    getPids(fieldId) {
        const pids = [];
        let node = this.getItem(fieldId);
        if (!node.$pid) return pids;

        let currentFieldId = node.$pid;
        let pNode;
        while (pNode = this.getItem(currentFieldId)) {
            pids.push(pNode.fieldId);
            currentFieldId = pNode.$pid;
            if (!currentFieldId) break;
        }

        return pids;
    }

    updateItem(item) {
        const items = this.getAllItems();
        const fieldId = item.fieldId;
        const idx = this.getItemIndex(fieldId);

        if (idx !== -1) {
            items[idx] = item;
        }

        this.onChange(items);
    }

    addItem(item, pid = null) {
        const items = this.getAllItems();

        item.$pid = pid;

        items.push(item);

        this.onChange(items);
    }

    removeItem(fieldId) {
        const items = this.getAllItems();
        //移除指定项目及子项目
        const ret = items.filter(item => {
            let shouldRemove = item.fieldId === fieldId;

            if (!shouldRemove) {
                const pids = this.getPids(item.fieldId);
                shouldRemove = pids.indexOf(fieldId) > -1;
            }

            return !shouldRemove;
        });

        this.onChange(ret);
    }

    getItemIndex(fieldId, items) {
        items = items || this.getAllItems();
        return findIndex(items, item => item.fieldId === fieldId)
    }

    getItem(fieldId) {
        const items = this.getAllItems();
        return find(items, item => item.fieldId === fieldId)
    }

    insertBefore(item, fieldId) {
        const items = this.getAllItems();

        //判断是否需要移动
        const _idx = this.getItemIndex(fieldId);
        if (_idx !== 0) {
            const prevItem = items[_idx - 1];
            if (prevItem.fieldId === item.fieldId) {
                return;
            }
        }

        //判断当前item是否已经存在, 如果存在则先删除
        const oIdx = this.getItemIndex(item.fieldId);
        if (oIdx > -1) {
            items.splice(oIdx, 1);
        }

        const bItem = this.getItem(fieldId);
        item.$pid = bItem.$pid;

        //插入操作
        const idx = this.getItemIndex(fieldId, items);
        items.splice(idx, 0, item);

        this.onChange(items);
    }

    insertAfter(item, fieldId) {
        const items = this.getAllItems();

        //判断是否需要移动
        const _idx = this.getItemIndex(fieldId);
        if (_idx !== (items.length - 1)) {
            const nextItem = items[_idx + 1];
            if (nextItem.fieldId === item.fieldId) {
                return;
            }
        }

        //判断当前item是否已经存在, 如果存在则先删除
        const oIdx = this.getItemIndex(item.fieldId);
        if (oIdx > -1) {
            items.splice(oIdx, 1);
        }

        const prevItem = this.getItem(fieldId);
        item.$pid = prevItem.$pid;

        //插入操作 之前有删除操作, 要重新查找index
        const idx = findIndex(items, item => item.fieldId === fieldId);
        items.splice(idx, 1, items[idx], item);

        this.onChange(items);
    }

    clearTmpItems() {
        const items = this.getAllItems();
        const newItems = items.filter(item => !item.__tmp__);

        this.onChange(newItems);
    }

    updateItemPid(item, pid = null) {
        const items = this.getAllItems();
        const fieldId = item.fieldId;
        const idx = this.getItemIndex(fieldId);

        if (idx !== -1) {
            item.$pid = pid;
            items[idx] = item;
        }

        this.onChange(items);
    }

    commitItem(item) {
        const items = this.getAllItems();
        const fieldId = item.fieldId;
        const idx = this.getItemIndex(fieldId);

        if (idx !== -1) {
            item.__tmp__ = false;
            delete item.__tmp__;
            items[idx] = item;
            this.setState({
                activeId: item.fieldId,
            });
        }

        this.onChange(items);
    }

    isTmpItem(item) {
        return !!item.__tmp__;
    }

    getModel() {
        return {
            //   isWidget: this.isWidget.bind(this),
            getWidget: this.getWidget.bind(this),
            getWidgets: this.getWidgets.bind(this),
            setActiveId: this.setActiveId.bind(this),
            getActiveId: this.getActiveId.bind(this),
            getActiveItem: this.getActiveItem.bind(this),
            addItem: this.addItem.bind(this),
            getPids: this.getPids.bind(this),
            updateItem: this.updateItem.bind(this),
            getItems: this.getItems.bind(this),
            getAllItems: this.getAllItems.bind(this),
            removeItem: this.removeItem.bind(this),
            getItemIndex: this.getItemIndex.bind(this),
            getItem: this.getItem.bind(this),
            insertBefore: this.insertBefore.bind(this),
            insertAfter: this.insertAfter.bind(this),
            clearTmpItems: this.clearTmpItems.bind(this),
            commitItem: this.commitItem.bind(this),
            isTmpItem: this.isTmpItem.bind(this),
            updateItemPid: this.updateItemPid.bind(this),

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