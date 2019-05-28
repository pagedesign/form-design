import React from 'react';
import { WidgetItem } from './widgets';

const widgets = [
    {
        id: "1",
        title: "单行文本框"
    },
    {
        id: "2",
        title: "多行文本框"
    },
    {
        id: "3",
        title: "单选列表"
    },
    {
        id: "4",
        title: "多选列表"
    },
    {
        id: "5",
        title: "数字"
    },
    {
        id: "6",
        title: "电话"
    },
    {
        id: "7",
        title: "邮件"
    },
    {
        id: "8",
        title: "日期"
    },
]

export default class WidgetsPanel extends React.Component {

    render() {

        return (
            <div className="widgets-panel">
                {
                    widgets.map(widget => {

                        return (
                            <WidgetItem key={widget.id} data={widget} />
                        );
                    })
                }
            </div>
        );
    }
}