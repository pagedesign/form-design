import PropertyPanel from './PropertyPanel';
import Preview from '../common/Preview';
import Widget from '../../Widget';
import getDefaultProps from '../common/getDefaultProps';
import icon from './icon.png';

export default Widget({
    xtype: "EX_TEXTAREA_FIELD",
    title: "多行文本",
    icon: icon,
    PropertyPanel,
})
