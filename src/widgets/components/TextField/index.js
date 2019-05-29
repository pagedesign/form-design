import PropertyPanel from './PropertyPanel';
import Preview from '../common/Preview';
import getDefaultProps from '../common/getDefaultProps';
import icon from './icon.png';

const XTYPE = 'EX_TEXT_FIELD';
const TEXT = '文本';

export default {
    $$widget: true,
    xtype: XTYPE,
    text: "文本",
    icon: icon,
    PropertyPanel,
    Preview,
    get props() {
        return {
            ...getDefaultProps(),
            xtype: XTYPE,
            title: TEXT,
            placeholder: '请输入',
        }
    }
}