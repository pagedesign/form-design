import PropertyPanel from './PropertyPanel';

import data from '../common/data';
import icon from './icon.png';

const XType = 'EX_TEXTAREA_FIELD';
const Title = '多行文本';

export default {
    xtype: "EX_TEXTAREA_FIELD",
    title: "多行文本",
    icon: icon,
    WidgetProperty: PropertyPanel,

    data() {
        return {
            ...data(),
            xtype: XType,
            title: Title,
            height: '70'
        }
    }
};