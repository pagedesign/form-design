import React from 'react';
import ReactDOM from 'react-dom';

import FormDesign from '../src';

import '../src/style';

function App() {

    return (
        <div style={{
            margin: "30px auto",
            width: 1400,
            minHeight: 500
        }}>
            <FormDesign onChange={console.log} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))