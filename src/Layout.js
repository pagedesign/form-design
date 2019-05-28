import React from 'react';
import WidgetsPanel from './WidgetsPanel';
import PropertyPanel from './PropertyPanel';
import DesignPanel from './DesignPanel';
import LayoutContext from './LayoutContext';

React.getD

export default class Layout extends React.Component {

    state = {
        items: this.props.items || []
    }

    // static getDerivedStateFromProps(props, state){

    // }

    addItem(item) {
        const { items } = this.state;
        this.setState({
            items: [
                ...items,
                item
            ]
        })
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