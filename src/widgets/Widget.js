import { uuid } from '../utils';
import DefaultPreview from './components/common/Preview';
import get from 'lodash/get';
import omit from 'lodash/omit';

export default function Widget(options = {}, props) {
    return {
        $$widget: true,
        xtype: options.xtype || 'unknow',
        title: options.title || 'unknow',
        icon: options.icon,
        PropertyPanel: options.PropertyPanel,
        Preview: options.Preview || DefaultPreview,
        get props() {

            return {
                fieldId: uuid(),
                fieldName: 'field_' + uuid(),
                xtype: this.xtype,
                title: this.title,
                placeholder: "请输入",
                dataType: 'varchar',
                dataLength: '255',
                required: '0',
                defaultValue: '',
                width: '100%',
                ...omit(options, [
                    'icon',
                    'PropertyPanel',
                    'Preview',
                ])
            }
        }
    };
}