import React from 'react';

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import WidgetsPanel from './WidgetsPanel';
import PropertyPanel from './PropertyPanel';
import DesignPanel from './DesignPanel';
import LayoutContext from './LayoutContext';

export default class Layout extends React.Component {

    static defaultProps = {
        onChange: null,
    }

    state = {
        items: this.props.defaultItems || [],
        activeId: null,
    }

    static getDerivedStateFromProps(props, state) {

        return {
            items: props.items || state.items
        }
    }

    onChange(items) {
        const props = this.props;
        const { onChange } = props;
        items = [...items];

        if (!('items' in props)) {
            this.setState({
                items
            });
        }

        if (onChange) {
            onChange(items);
        }
    }

    // updateList(items) {
    //     this.setState({
    //         items: [
    //             ...items,
    //         ]
    //     });

    //     this.onChange(items);
    // }

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
        return this.state.items;
    }

    updateItem(item) {
        const { items } = this.state;
        const fieldId = item.fieldId;
        const idx = this.getItemIndex(fieldId);

        if (idx !== -1) {
            items[idx] = item;
        }

        this.onChange(items);
    }

    addItem(item) {
        const { items } = this.state;

        items.push(item);

        this.onChange(items);
    }

    removeItem(fieldId) {
        const { items } = this.state;
        const ret = items.filter(item => item.fieldId !== fieldId);

        this.onChange(ret);
    }

    getItemIndex(fieldId) {
        const { items } = this.state;
        return findIndex(items, item => item.fieldId === fieldId)
    }

    getItem(fieldId) {
        const { items } = this.state;
        return find(items, item => item.fieldId === fieldId)
    }

    insertBefore(item, fieldId) {
        const { items } = this.state;
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
        const { items } = this.state;
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

    getContext() {

        return {
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
        return (
            <LayoutContext.Provider value={this.getContext()}>
                <div className="ex-form-design">
                    <div className="ex-form-design-container">
                        <WidgetsPanel />
                        <DesignPanel />
                        <PropertyPanel />
                    </div>
                </div>
            </LayoutContext.Provider >
        );
    }
}