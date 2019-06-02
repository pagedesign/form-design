import { uuid } from '../../utils';

export default () => {
    return {
        fieldId: uuid(),
        fieldName: 'field_' + uuid(),
        placeholder: "请输入",
        dataType: 'varchar',
        dataLength: '255',
        required: '0',
        defaultValue: '',
        width: '100%',
    }
}