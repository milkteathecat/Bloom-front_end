import React from 'react';
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

const operations = <Button>Extra Action</Button>;
export class Home extends React.Component {
    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    Content of tab 1
                </TabPane>
                <TabPane tab="Map" key="2">
                    Content of tab 2
                </TabPane>
            </Tabs>
        );
    }
}