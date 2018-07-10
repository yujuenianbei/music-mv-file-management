import React, { Component } from 'react';
import * as Actions from './redux/action/index';
import { connect } from 'react-redux';
import { Button } from 'antd';

import MusicControllForm from './musicUploadModle'

class MusicControll extends Component {
    constructor() {
        super();
        this.state = {
            ModalText: 'Content of the modal',
            addVisible: false,
        }
        this.showModal = this.showModal.bind(this);
    }
    showModal() {
        this.props.onAddSongState({
            addSongModle: true,
        });
    }
    render() {
        const { addVisible } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>新增</Button>
                <div className='add'>
                    <MusicControllForm />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        addSong: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddSongState: (bool) => {
            dispatch(Actions.addSong(bool));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicControll);