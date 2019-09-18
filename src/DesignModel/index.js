import React from "react";
import propTypes from "prop-types";
import DesignerContext from "../DesignerContext";
// import Widget from "./Widget";

import find from "lodash/find";
import findIndex from "lodash/findIndex";

let idx = 1;

function randomStr(prefix = "") {
    return (
        prefix +
        Math.random()
            .toString(16)
            .slice(2, 8)
    );
}

function normalizeItem(item, props) {
    const idField = props.idField;
    const pidField = props.pidField;

    item[idField] =
        item[idField] === undefined ? randomStr(`${idx++}_`) : item[idField];

    item[pidField] = item[pidField] === undefined ? null : item[pidField];

    return item;
}

export default class DesignModel extends React.Component {
    static propTypes = {
        items: propTypes.array
    };

    static getDerivedStateFromProps(props, state) {
        // const widgetsMap = {};
        // const widgets = props.widgets.map(widget => {
        //     const w = new Widget(widget);
        //     widgetsMap[widget.xtype] = w;
        //     return w;
        // });

        return {
            // widgets,
            // widgetsMap,
            items: props.items.map(item => normalizeItem(item, props))
        };
    }

    static defaultProps = {
        idField: "id",
        pidField: "pid",
        onChange: null,
        widgets: [],
        items: []
    };

    DropContainerContext = React.createContext({
        isRootContainer: true,
        canDrop: null
    });

    state = {
        scope: randomStr("scope_"),
        widgets: [],
        widgetsMap: {},
        items: [],
        activeId: null
    };

    onChange(items) {
        const props = this.props;
        const { onChange } = props;

        //TODO: 列出新增节点或删除节点

        if (onChange) {
            onChange(items);
        }
    }

    // getWidget(xtype) {
    //     const { widgetsMap } = this.state;
    //     let widget = widgetsMap[xtype];

    //     if (!widget) {
    //         widget = new Widget({
    //             xtype,
    //             title: xtype
    //         });
    //     }
    //     return widget;
    // }

    // getWidgets() {
    //     const { widgets } = this.state;
    //     return [].concat(widgets);
    // }

    getScope() {
        return this.state.scope;
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

        return items.filter(item => item && item.$pid == pid);
    }

    getChildren(fieldId = null, items = this.state.items) {
        return items.filter(item => item.$pid == fieldId);
    }

    getAllItems() {
        return [...this.state.items];
    }

    //获取组件的所有父级ID
    getPids(fieldId) {
        const pids = [];
        let node = this.getItem(fieldId);

        if (!node) return pids;

        if (!node.$pid) return pids;

        let currentFieldId = node.$pid;
        let pNode;
        while ((pNode = this.getItem(currentFieldId))) {
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
        item = normalizeItem(item, this.props);

        const items = this.getAllItems();

        item.$pid = pid;

        items.push(item);

        this.onChange(items);
    }

    addTmpItem(item, pid) {
        item.__tmp__ = true;
        item.__dragging__ = true;
        this.addItem(item, pid);
    }

    setItemDragging(item) {
        item.__dragging__ = true;

        this.onChange(this.getAllItems());
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
        return findIndex(items, item => item.fieldId === fieldId);
    }

    getItem(fieldId) {
        const items = this.getAllItems();
        return find(items, item => item && item.fieldId === fieldId);
    }

    insertBefore(item, fieldId) {
        const items = this.getAllItems();
        const bItem = this.getItem(fieldId);

        //判断是否需要移动
        const _idx = this.getItemIndex(fieldId);
        if (_idx !== 0) {
            const prevItem = items[_idx - 1];
            if (
                prevItem.fieldId === item.fieldId &&
                prevItem.$pid === bItem.$pid
            ) {
                return;
            }
        }

        //判断当前item是否已经存在, 如果存在则先删除
        const oIdx = this.getItemIndex(item.fieldId);
        if (oIdx > -1) {
            items.splice(oIdx, 1);
        }

        item.$pid = bItem.$pid;

        //插入操作
        const idx = this.getItemIndex(fieldId, items);
        items.splice(idx, 0, item);

        this.onChange(items);
    }

    insertAfter(item, fieldId) {
        const items = this.getAllItems();
        const prevItem = this.getItem(fieldId);

        //判断是否需要移动
        const _idx = this.getItemIndex(fieldId);
        if (_idx !== items.length - 1) {
            const nextItem = items[_idx + 1];
            if (
                nextItem.fieldId === item.fieldId &&
                nextItem.$pid === prevItem.$pid
            ) {
                return;
            }
        }

        //判断当前item是否已经存在, 如果存在则先删除
        const oIdx = this.getItemIndex(item.fieldId);
        if (oIdx > -1) {
            items.splice(oIdx, 1);
        }

        item.$pid = prevItem.$pid;

        //插入操作 之前有删除操作, 要重新查找index
        const idx = findIndex(items, item => item.fieldId === fieldId);
        items.splice(idx, 1, items[idx], item);

        this.onChange(items);
    }

    clearTmpItems() {
        const items = this.getAllItems();
        const newItems = items
            .map(item => {
                if (item.__dragging__) {
                    delete item.__dragging__;
                }
                return item;
            })
            .filter(item => !item.__tmp__);

        this.onChange(newItems);
    }

    updateItemPid(item, pid = null) {
        const fieldId = item.fieldId;
        const idx = this.getItemIndex(fieldId);

        if (item.$pid === pid) return true;

        /**
         * 局部环路检测
         * 如: {id: A, pid: null}  {id: B, pid: A}
         * 这是如果updateItemPid(A, B) 结果为:
         * {id: A, pid: B}  {id: B, pid: A}
         *
         */
        const pids = pid == null ? [] : this.getPids(pid);
        if (pids.length) {
            if (pids.indexOf(fieldId) !== -1) {
                return false;
            }
        }

        //fix: 同级节点转变为子节点时顺序问题
        if (pid) {
            const pidIndex = this.getItemIndex(pid);
            const childs = this.getChildren(pid);

            if (childs.length) {
                const firstItem = childs[0];
                const lastItem = childs[childs.length - 1];

                if (idx > pidIndex) {
                    this.insertAfter(item, lastItem.fieldId);
                } else {
                    this.insertBefore(item, firstItem.fieldId);
                }
                return true;
            }
        }

        if (idx !== -1) {
            item.$pid = pid;
        }

        this.onChange(this.getAllItems());

        return true;
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
                activeId: item.fieldId
            });
        }

        this.onChange(items);
    }

    isTmpItem(item) {
        return !!item.__tmp__;
    }

    isDragging(item) {
        return item.__dragging__;
    }

    getModel() {
        return {
            DropContainerContext: this.DropContainerContext,
            // getWidget: this.getWidget.bind(this),
            // getWidgets: this.getWidgets.bind(this),
            getScope: this.getScope.bind(this),
            setActiveId: this.setActiveId.bind(this),
            getActiveId: this.getActiveId.bind(this),
            getActiveItem: this.getActiveItem.bind(this),
            addItem: this.addItem.bind(this),
            addTmpItem: this.addTmpItem.bind(this),
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
            setItemDragging: this.setItemDragging.bind(this),
            isDragging: this.isDragging.bind(this)
        };
    }

    render() {
        const { children } = this.props;
        console.log("DesignModel:");

        return (
            <DesignerContext.Provider value={this.getModel()}>
                {children}
            </DesignerContext.Provider>
        );
    }
}
