import React, { Component } from 'react';
import { Table, Icon, Divider } from 'antd';

const { Column, ColumnGroup } = Table;


class MusicTable extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        const data = [{
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];
        return (
            <Table dataSource={data}>
                <Column
                    title="First Name"
                    dataIndex="firstName"
                    key="firstName"
                />
                <Column
                    title="Last Name"
                    dataIndex="lastName"
                    key="lastName"
                />
                <Column
                    title="Age"
                    dataIndex="age"
                    key="age"
                />
                <Column
                    title="Address"
                    dataIndex="address"
                    key="address"
                />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <span>
                            <a href="javascript:;">Action 一 {record.name}</a>
                            <Divider type="vertical" />
                            <a href="javascript:;">Delete</a>
                            <Divider type="vertical" />
                            <a href="javascript:;" className="ant-dropdown-link">
                                More actions <Icon type="down" />
                            </a>
                        </span>
                    )}
                />
            </Table>
        )
    }
}

export default MusicTable;