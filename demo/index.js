import React from 'react';
import ReactDOM from 'react-dom';

import FormDesigner from '../src';

import '../src/style';

function App() {
    const [metadata, onMetadataChange] = React.useState({
        items: []
    })

    return (
        <div style={{
            margin: "30px auto",
            width: 1400,
            minHeight: 500
        }}>
            <FormDesigner metadata={metadata} onChange={onMetadataChange} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))