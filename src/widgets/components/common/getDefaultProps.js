import {uuid} from '../../../utils';

export default function getDefaultProps(params) {
    
    return {
        fieldId: uuid(),
        fieldName: uuid(),
        xtype: 'unknow',
        title: 'unknow',
        placeholder: "请输入",
        dataType: 'varchar',
        dataLength: 255,
        isRequire: false,
        width: '100%',
    }
}