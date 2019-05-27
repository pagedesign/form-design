//表单设计器数据模型

function randomStr() {
    return Math.random().toString(16).slice(2, 10);
}

export default (props = {}) => {

    return {
        ...props,
        fieldId: randomStr()
    };
}