import React from 'react';
import FormDesignContext from './FormDesignContext';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Store from './store';
import Layout from './Layout';

class FormDesign extends React.Component {

    store = new Store()

    render() {

        return (
            <div className="ex-form-design">
                <Layout />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(FormDesign);