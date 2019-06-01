import React from 'react';
import Icon from '../Icon';

function getUnit(value) {

    if (/px$/.test(value)) {
        return 'px';
    }

    if (/%$/.test(value)) {
        return '%';
    }

    return 'px';

}

function toValue(value) {
    value = parseFloat(value);
    return isNaN(value) ? 0 : value;
}

export default class WidthInputField extends React.Component {

    static getDerivedStateFromProps(props, state) {

        if ('value' in props) {
            return {
                value: toValue(props.value),
                unit: getUnit(props.value)
            }
        }

    }

    constructor(props, ...a) {
        super(props, ...a);

        const value = props.defaultValue || '';
        this.state = {
            value: toValue(value),
            unit: getUnit(value),
        }

    }

    renderSuffix() {
        const { unit } = this.state;

        return (
            <div className="width-suffix">
                <div className="width-suffix-text">
                    <span>{unit}</span>
                    <div className="width-suffix-unit">
                        <div className="width-suffix-unit-item" onClick={this.onUnitChange.bind(this, 'px')}>px</div>
                        <div className="width-suffix-unit-item" onClick={this.onUnitChange.bind(this, '%')}>%</div>
                    </div>
                </div>
                <Icon type="caret-down" />
            </div>
        );
    }

    onUnitChange(unit) {
        const props = this.props;
        let { value } = this.state;

        if (unit === '%') {
            value = Math.max(Math.min(value, 100), 0);
        }

        if (!('value' in props)) {
            this.setState({
                unit,
                value
            });
        }

        props.onChange && props.onChange(value + unit);
    }

    handleInputChange = e => {
        const { unit } = this.state;
        const props = this.props;

        let value = toValue(e.target.value);

        if (unit === '%') {
            value = Math.max(Math.min(value, 100), 0);
        }

        if (!('value' in props)) {
            this.setState({
                value
            });
        }

        const v = (value + unit);

        props.onChange && props.onChange(v);
    }

    render() {
        const { value } = this.state;

        return (
            <div className="width-input-field">
                <input
                    onChange={this.handleInputChange}
                    value={value}
                />
                {
                    this.renderSuffix()
                }
            </div>
        );
    }
}