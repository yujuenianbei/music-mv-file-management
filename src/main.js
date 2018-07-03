import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Left from './left';
import Header from './header';
import Content from './content';
import './main.less'
import Player from './player';



class SiderDemo extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Left />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content />
          <Player />
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo