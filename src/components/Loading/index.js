import React from 'react';
import { Spin, Icon } from 'antd'

export default () => {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
        <div style={{ padding: 30, textAlign: "center" }}>
            <Spin indicator={antIcon} />
        </div>
    );
}