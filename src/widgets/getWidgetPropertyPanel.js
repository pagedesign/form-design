import components from './components';
import find from 'lodash/find';
import PropertyPanel from './components/common/CommonPropertyPanel';

export default function (xtype) {
    const Panel = find(components, cmp => cmp.xtype === xtype);
    return Panel ? Panel.PropertyPanel : PropertyPanel;
}