import React, { Component } from 'react';
import Main from './layout/main'
import './main.less'
class Content extends Component {
    render() {
        const height = window.innerHeight - 48;
        return (
            <div className='test' style={{ margin: '0px', height: height, overflow: 'auto' }}>
                <Main />
            </div>
        )
    }
}

export default Content;