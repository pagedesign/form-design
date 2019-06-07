import PropertyPanel from './PropertyPanel';
import Preview from './Preview';
import data from '../common/data';
import icon from './icon.png';

const XType = 'EX_DETAILED_FIELD';
const Title = '明细';

export default {
    xtype: XType,
    title: Title,
    icon: icon,
    WidgetProperty: PropertyPanel,
    Preview: Preview,
    data() {
        return {
            ...data(),
            xtype: XType,
            title: Title,
        }
    }
};