import React, { Component } from 'react';
import PlayList from './playList';
import Player from './player';
class PlayerIndex extends Component {
    render() {
        const height = window.innerHeight - 48;
        return (
            <div>
                <Player />
                <PlayList />
            </div>
        )
    }
}

export default PlayerIndex;