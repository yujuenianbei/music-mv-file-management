import React from 'react';
import * as Actions from './redux/action/index';
import { connect } from 'react-redux';
import './play.less';
import _ from 'lodash';
import { Menu, Dropdown, Button, Slider, Icon } from 'antd';


class PlayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.songListClose = this.songListClose.bind(this);
        this.songChange = this.songChange.bind(this);
        this.test = this.test.bind(this);
        this.test2 = this.test2.bind(this);
        this.data =
            [{
                sid: 1,
                name: 'trip',
                img: 'http://p1.music.126.net/BfcRJ5f3Tu988TPBhrhZ6Q==/7916483720778040.jpg',
                author: 'Axero',
                time: '03:08',
                album:'Trip',
                src: 'http://oqimv5cbl.bkt.clouddn.com/Vonikk%20-%20Phoenix.mp3'
            }]
        this.data2 = {
            sid: 2,
            img: 'http://p1.music.126.net/38DBmbQxk3ORmn9WS9ZcPw==/3393092920213752.jpg',
            name: 'Charm Point',
            author: "Ujico*/Snail's house",
            time: '04:18',
            album:'Charm Point',
            src: 'http://oqimv5cbl.bkt.clouddn.com/Ujico%EF%BC%8A%EF%BC%8FSnail%27s%20house%20-%20Charm%20Point.mp3'
        }
    }
    // 
    test = () => {
        this.props.onSetList({ data: this.data })
    }
    test2 = (e, a) => {
        // console.log(e.target, a);
        const newData = _.concat(this.data, this.data2)
        const data = newData.reverse();
        this.props.onAddList({ data: data })
    }
    // toggle 播放列表
    songListClose = () => {
        this.props.onSongListClose({ songListShow: !this.props.setList.music.songListShow });
    }
    // 切歌
    songChange = (e, data) => {
        this.test2(e,data)
        this.props.onChangeSongPlayNow({ 
            songId: data.sid,
            src: data.src,
            songImg: data.img,
            songName: data.name,
            songAuthor: data.author
        });
    }

    componentDidMount() {
        this.test();
    }
    shouldComponentUpdate(nextProps) {
        if(nextProps.setList !== this.props.setList){
            return true
        } else {

            return false
        }
    }
    render() {
        return (
            <div className="songListDetail" style={{ bottom: this.props.setList.music.songListShow ? "52px" : "-252px" }}>
                <div className="songListDetailTitle">
                    歌曲列表
                    <span className='songListTitleClose' onClick={this.songListClose}>
                        <Icon type="close" />
                    </span>
                </div>
                <div className='songListDetailMenu'>
                    <ul>
                        {this.props.setList.music.data.map((item, index) => {
                            // (e) => { this.test2(e, item) }
                            return <li className={'songListLi ' + index} key={index.toString()} onDoubleClick={(e) => { this.songChange(e,item) }} ><div className='playNow'><Icon type={this.props.setList.music.playstate ? 'caret-right' : 'pause'} style={{ opacity: this.props.setList.music.songId === item.sid ? 1 : 0 }} /></div><div className='songName'>{item.name}</div><div className='songSinger'>{item.author}</div><div className='songTime'>{item.time}</div></li>;
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        setList: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetList: (data) => {
            dispatch(Actions.setList(data));
        },
        onAddList: (data) => {
            dispatch(Actions.addList(data));
        },
        onToggleLike: (bool) => {
            dispatch(Actions.songLike(bool));
        },
        onSongListClose: (bool) => {
            dispatch(Actions.songListToggle(bool));
        },
        onChangeSongPlayNow: (data) => {
            dispatch(Actions.songPlayNow(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayList);