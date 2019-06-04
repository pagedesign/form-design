import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Designer from './Designer';

export default DragDropContext(HTML5Backend)(Designer);