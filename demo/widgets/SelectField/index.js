import PropertyPanel from './PropertyPanel';

import data from '../common/data';
import icon from './icon.png';

const XType = 'EX_SELECT_FIELD';
const Title = '单选列表';

export default {
    xtype: XType,
    title: Title,
    icon: icon,
    WidgetProperty: PropertyPanel,

    data() {
        return {
            ...data(),
            xtype: XType,
            title: Title,
            data: [
                {
                    value: '选项1',
                    label: '选项1',
                },
                {
                    value: '选项2',
                    label: '选项2',
                },
                {
                    value: '选项3',
                    label: '选项3',
                }
            ]
        }
    }
};
