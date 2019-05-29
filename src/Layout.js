import React from 'react';

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import WidgetsPanel from './WidgetsPanel';
import PropertyPanel from './PropertyPanel';
import DesignPanel from './DesignPanel';
import LayoutContext from './LayoutContext';

export default class Layout extends React.Component {

    state = {
        items: this.props.defaultItems || []
    }

    static getDerivedStateFromProps(props, state) {

        return {
            items: props.items || state.items
        }
    }

    addItem(item) {
        const { items } = this.state;
        this.setState({
            items: [
                ...items,
                item
            ]
        })
    }

    removeItem(fieldId) {
        const { items } = this.state;
        const ret = items.filter(item => item.fieldId !== fieldId);

        this.setState({
            items: ret
        });
    }

    getItemIndex(fieldId) {
        const { items } = this.state;
        return findIndex(items, item => item.fieldId === fieldId)
    }

    getItem(fieldId) {
        const { items } = this.state;
        return find(items, item => item.fieldId === fieldId)
    }

    insertBefore(item,fieldId) {
const { items } = this.state;
const idx = this.getItemIndex(fieldId);
item.splice(idx, 0, item);

this.setState({
    items: [
        ...items
    ]
});

    }

    insertAfter(item,fieldId) {
const { items } = this.state;
const idx = this.getItemIndex(fieldId);
item.splice(idx, 1, [items[idx],item]);

this.setState({
    items: [
        ...items
    ]
});

    }

    append(item) {
          const { items } = this.state;

          this.setState({
              items: [
                  ...items,
                  items
              ]
          });
    }

    getContext() {

        return {
            getItems: () => {
                return this.state.items;
            },
            addItem: this.addItem.bind(this),
        }
    }

    render() {

        return (
            <LayoutContext.Provider value={this.getContext()}>
                <div className="ex-form-design-container">
                    <WidgetsPanel />
                    <DesignPanel />
                    <PropertyPanel />
                </div>
            </LayoutContext.Provider>
        );
    }
}