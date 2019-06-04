import data from '../common/data';
import PropertyPanel from './PropertyPanel';
import icon from './icon.png';

const XType = 'EX_TEXT_FIELD';
const Title = '文本';

export default {
    xtype: "EX_TEXT_FIELD",
    title: "文本",
    icon: icon,
    WidgetProperty: PropertyPanel,

    data() {
        return {
            ...data(),
            xtype: XType,
            title: Title,
        }
    }
};