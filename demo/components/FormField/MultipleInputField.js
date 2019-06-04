import React from 'react';
// import { FormItem } from '../Form';
import Icon from '../Icon';

export default class MultipleInputField extends React.Component {

    static getDerivedStateFromProps(props, state) {
        let value = props.value || state.value;

        if (!Array.isArray(value)) {
            value = [];
        }

        if (!value.length) {
            value.push({
                value: '选项1',
                label: '选项1',
            });
        }

        return {
            value: [...value],
            sIndex: Math.max(value.length, state.sIndex),
        }
    }
    state = {
        value: this.props.defaultValue || [],
        sIndex: 1,
    }

    onItemChange(index, e) {
        const { onChange } = this.props;
        const { value } = this.state;
        value[index] = {
            value: e.target.value,
            label: e.target.value,
        };

        onChange && onChange(value);
    }

    onAddItem(index) {
        const { onChange } = this.props;
        const { value, sIndex } = this.state;

        const text = '选项' + (1 + sIndex);

        this.setState({
            sIndex: sIndex + 1,
        });

        const item = {
            value: text,
            label: text,
        };

        value.splice(index, 1,
            value[index],
            item
        )

        onChange && onChange(value);
    }

    onRemoveItem(index) {
        const { onChange } = this.props;
        const { value } = this.state;

        if (value.length <= 1) return;

        value.splice(index, 1)

        onChange && onChange(value);
    }

    renderItem = (item, i) => {

        return (
            <div className="multi-input-item" key={i}>
                <div className="multi-input">
                    <input
                        value={item.label}
                        placeholder="选项名称"
                        onChange={this.onItemChange.bind(this, i)}
                    />
                </div>
                <div className="multi-input-tools">
                    <Icon type="add" onClick={this.onAddItem.bind(this, i)}>+</Icon>
                    <Icon type="remove" onClick={this.onRemoveItem.bind(this, i)}>-</Icon>
                </div>
            </div>
        );
    }

    render() {
        const { value } = this.state;

        return (
            <div className="multi-input-wrapper">
                {
                    value.map(this.renderItem)
                }
            </div>
        );
    }
}