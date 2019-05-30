import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormContext from './FormContext';
export default class FormItem extends React.Component {

    static contextType = FormContext;

    static propTypes = {
        label: PropTypes.node,
        labelFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelPosition: PropTypes.oneOf(['top', 'left', 'right']),
        alignItems: PropTypes.oneOf(['top', 'center', 'bottom']),
        name: PropTypes.string,
        rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
        required: PropTypes.bool,
        normalize: PropTypes.func,
        validateDelay: PropTypes.number,
        validateTrigger: PropTypes.string, //change blur none
        inline: PropTypes.bool,
        showMessage: PropTypes.bool,
        help: PropTypes.node,
        style: PropTypes.object,
        //extra: PropTypes.node,
    }

    static defaultProps = {
        prefixCls: 'rw-form-item',
        // labelPosition: 'left',
        // alignItems: "center",
        // inline: false,
        //showMessage: true,
    }

    saveDOM = dom => {
        this._dom = dom;
    }

    getDOM() {
        return this._dom;
    }

    componentDidMount() {
        const { form } = this.context;
        const { name } = this.props;

        if (name) {
            form.addField(this);
        }
    }

    componentWillUnmount() {
        const { form } = this.context;
        form.removeField(this);
    }

    isRequired() {
        const { form } = this.context;
        const { name } = this.props;
        let rules = form.getFieldRules(name);
        let isRequired = false;

        if (rules && rules.length) {
            isRequired = rules.some(rule => rule.required);
        }

        return isRequired;
    }

    _validateTimer = null

    getValidateTrigger() {
        const { form } = this.context;
        const { validateTrigger } = form.props;
        const props = this.props;

        return 'validateTrigger' in props ? props.validateTrigger : validateTrigger;
    }

    getValidateDelay() {
        const { form } = this.context;
        const { validateDelay } = form.props;
        const props = this.props;

        return 'validateDelay' in props ? props.validateDelay : validateDelay;
    }

    onFieldBlur() {
        const { form } = this.context;
        const validateTrigger = this.getValidateTrigger();
        const validateDelay = this.getValidateDelay();
        const { name } = this.props;

        if (validateTrigger === 'blur') {
            if (validateDelay > 0) {
                if (this._validateTimer) clearTimeout(this._validateTimer)
                this._validateTimer = setTimeout(() => {
                    form.validateField(name);
                }, validateDelay);
            } else {
                form.validateField(name);
            }
        }
    }

    getValue() {
        const { name } = this.props;
        const { form } = this.context;

        return form.getValue(name);
    }

    onFieldChange(value, e) {
        const { form } = this.context;
        const { name } = this.props;

        form.setValue(name, value, e, () => {
            const validateTrigger = this.getValidateTrigger();
            const validateDelay = this.getValidateDelay();

            if (validateTrigger === 'change') {
                if (validateDelay > 0) {
                    if (this._validateTimer) clearTimeout(this._validateTimer)
                    this._validateTimer = setTimeout(() => {
                        form.validateField(name);
                    }, validateDelay);
                } else {
                    form.validateField(name);
                }
            }
        });


    }

    getLabelProps() {
        const { form } = this.context;
        const formProps = form.props;
        const props = this.props;

        return {
            inline: 'inline' in props ? props.inline : formProps.inline,
            labelPosition: 'labelPosition' in props ? props.labelPosition : formProps.labelPosition,
            labelWidth: 'labelWidth' in props ? props.labelWidth : formProps.labelWidth,
            alignItems: 'alignItems' in props ? props.alignItems : formProps.alignItems,
            showMessage: 'showMessage' in props ? props.showMessage : formProps.showMessage,
        }
    }

    render() {
        const { form } = this.context;
        const {
            normalize,
            label,
            required,
            labelFor,
            className,
            prefixCls,
            name,
            help,
            style,
            //extra,
        } = this.props;
        const { inline, labelPosition, labelWidth, alignItems, showMessage } = this.getLabelProps();
        const error = form.getError(name);
        const validating = form.isValidatingField(name);

        const children = React.Children.only(this.props.children);

        const {
            onChange,
            onBlur
        } = children.props;

        const getFormItemInputProps = form.props.getInputProps || function () { return {} };

        const onFieldChange = this.onFieldChange.bind(this);
        const onFieldBlur = this.onFieldBlur.bind(this);

        const InputComponent = React.cloneElement(children, {
            ...getFormItemInputProps(name),
            value: this.getValue(),
            onChange: function (value, event) {
                if (normalize) {
                    value = normalize(value);
                }

                onChange && onChange(value, event);

                onFieldChange(value, event)
            },
            onBlur: function (e) {
                onBlur && onBlur(e);
                onFieldBlur(e)
            },
        });

        return (
            <div
                style={style}
                ref={this.saveDOM}
                className={classnames(prefixCls, {
                    [`${prefixCls}-inline`]: inline,
                    [`${prefixCls}-position-${labelPosition}`]: labelPosition,
                    [`${prefixCls}-align-items-${alignItems}`]: alignItems !== 'center',
                    [`${prefixCls}-error`]: error,
                    [`${prefixCls}-validating`]: validating,
                    [`${prefixCls}-required`]: this.isRequired() || required,
                    [`${prefixCls}-with-help`]: help,
                    [`${className}`]: className,
                })}
            >
                {
                    label && (
                        <label
                            htmlFor={labelFor}
                            className={`${prefixCls}-label`}
                            style={{
                                width: labelWidth
                            }}
                        >
                            {label}
                        </label>
                    )
                }
                <div className={`${prefixCls}-content`}>
                    {InputComponent}
                    {
                        !help && showMessage && error ? (
                            <div className={`${prefixCls}-error-tip`} >{error}</div>
                        ) : null
                    }
                    {
                        help ? (
                            <div className={`${prefixCls}-help`} >{help}</div>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}