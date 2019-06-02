import React from 'react';
import PropTypes from 'prop-types';
import DesignModel from './DesignModel';

import WidgetsPanel from './panels/WidgetsPanel';
import PropertyPanel from './panels/PropertyPanel';
import DesignPanel from './panels/DesignPanel';

import {
    P_PC,
    P_MOBILE,
    P_IPAD,
} from './constants';

import widgets from './widgets2';

export default class Designer extends React.Component {
    static propTypes = {
        widgets: PropTypes.array,
        platform: PropTypes.oneOf([P_PC, P_MOBILE, P_IPAD]),
        metadata: PropTypes.object,
    }

    static defaultProps = {
        onChange: null,
        platform: P_PC,
        widgets: widgets,
        metadata: {
            items: [],
        }
    }

    handleModelChange = (items) => {
        const { onChange, metadata } = this.props;

        onChange && onChange({
            ...metadata,
            items,
        })
    }

    render() {
        const { widgets, metadata, platform } = this.props;

        return (
            <DesignModel
                widgets={widgets}
                items={metadata.items}
                platform={platform}
                onChange={this.handleModelChange}
            >
                <div className="ex-form-design">
                    <div className="ex-form-design-container">
                        <WidgetsPanel />
                        <DesignPanel />
                        <PropertyPanel />
                    </div>
                </div>
            </DesignModel>
        )
    }
}