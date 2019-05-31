import React from 'react';
import classNames from 'classnames';

export default (props) => {

    return <span {...props} className={
        classNames(props.className, 'icon-' + props.type)
    } />
}