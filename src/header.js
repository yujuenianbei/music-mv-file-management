import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Header extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="mail">
                    <Icon type="mail" />One
                </Menu.Item>
                <Menu.Item key="app" disabled>
                    <Icon type="appstore" />Two
                </Menu.Item>
                <SubMenu title={<span><Icon type="setting" />Submenu</span>}>
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                </SubMenu>
                <Menu.Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">FourLink</a>
                </Menu.Item>
                <Menu.Item key="rightMenu" style={{ float: 'right'}}>
                    <Icon type="menu-fold" />
                </Menu.Item>
            </Menu>
        )
    }
}

export default Header;