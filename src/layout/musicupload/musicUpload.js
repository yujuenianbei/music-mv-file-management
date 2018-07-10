import React, { Component } from 'react';
import MusicTable from './musicList'
import MusicControll from './musicControll'

class Main extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render() {
        const state = this.state;
        return (
            <div style={{ margin: 16, padding: 6, background: '#fff' }}>
                <MusicControll />
                <MusicTable />
            </div>
        )
    }
}

export default Main;