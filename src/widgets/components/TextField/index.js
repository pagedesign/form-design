import PropertyPanel from './PropertyPanel';
import Preview from '../common/Preview';
import getDefaultProps from '../common/getDefaultProps';
import Widget from '../../Widget';
import icon from './icon.png';

const XTYPE = 'EX_TEXT_FIELD';
const TEXT = '文本';

export default Widget({
    xtype: "EX_TEXT_FIELD",
    title: "文本",
    icon: icon,
    PropertyPanel,
})
