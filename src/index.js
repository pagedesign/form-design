import React from 'react';
// import FormDesignContext from './FormDesignContext';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// import Layout from './Layout';
import Layout from './Designer';

export default DragDropContext(HTML5Backend)(Layout);