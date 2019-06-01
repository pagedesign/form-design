import PropertyPanel from './PropertyPanel';
import Widget from '../../Widget';
import icon from './icon.png';

export default Widget({
    xtype: "EX_SELECT_FIELD",
    title: "单选列表",
    icon: icon,
    PropertyPanel,
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
})
