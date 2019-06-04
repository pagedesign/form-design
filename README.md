# form-design 表单设计器

`npm install --save form-design-core`

## Usage

```
import FormDesigner from 'form-design-core';
import widgets from './widgets'

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
            <FormDesigner widgets={widgets} metadata={metadata} onChange={onMetadataChange} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))

```

