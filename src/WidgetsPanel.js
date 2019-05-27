import React from 'react';
import { WidgetItem } from './widgets'

export default class WidgetsPanel extends React.Component {

    render() {

        return (
            <div className="widgets-panel">
                <WidgetItem>
                    <div className="widget-item">
                        单行文本框
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        多行文本框
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        单选列表
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        多选列表
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        数字
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        电话
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        电话
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        电话
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        电话
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        电话
                    </div>
                </WidgetItem>
                <WidgetItem>
                    <div className="widget-item">
                        电话
                    </div>
                </WidgetItem>
                <div className="widget-item">
                    邮件
                </div>
                <div className="widget-item">
                    身份证
                </div>
                <div className="widget-item">
                    日期
                </div>
                <div className="widget-item">
                    日期
                </div>
                <div className="widget-item">
                    日期时间
                </div>

            </div>
        );
    }
}