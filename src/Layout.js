import React from 'react';
import WidgetsPanel from './WidgetsPanel';
import PropertyPanel from './PropertyPanel';
import DesignPanel from './DesignPanel';
import LayoutContext from './LayoutContext';

export default class Layout extends React.Component {

    state = {
        items: props.defaultItems || []
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

    getItem() {

    }

    getItemIndex() {

    }

    insertBefore(fieldId) {

    }

    insertAfter(fieldId) {

    }

    append(item) {
        this.items.push(item)
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