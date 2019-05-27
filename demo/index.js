import React from 'react';
import ReactDOM from 'react-dom';

import FormDesign from '../src';

import '../src/style';

function App() {

    return (
        <div style={{
            margin: "30px auto",
            border: '1px solid #ececec',
            width: 1400,
            height: 500
        }}>
            <FormDesign />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))