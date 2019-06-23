import React from 'react';
import ReactDOM from 'react-dom';

import FormDesigner from '../src';

import widgets from './widgets';

import '../src/style';

function App() {
    const [metadata, onMetadataChange] = React.useState({
        items: []
    })

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }}>
            <FormDesigner
                widgets={widgets}
                metadata={metadata}
                onChange={onMetadataChange}
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))