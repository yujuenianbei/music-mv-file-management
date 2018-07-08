import React from 'react';
import * as Actions from './redux/action/index';
import { connect } from 'react-redux';
import './play.less';
import { Menu, Dropdown, Button, Slider, Icon } from 'antd';
import logo from '../static/xuezhiqian.jpg';


const iconColor = '#001529'
const like = '#f5222d'
const url = 'http://localhost:4000'



class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            volume: 0,
            songFullTime: 0,
            songCurrentTime: 0,
            songCurrentTimeSlider: 0,
            songData: []
        },
        this.likeOnToggle = this.likeOnToggle.bind(this);
        this.playOnToggle = this.playOnToggle.bind(this);
        this.secondToDate = this.secondToDate.bind(this);
        this.soundChange = this.soundChange.bind(this);
        this.songListToggle = this.songListToggle.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.preSong = this.preSong.bind(this);
    }
    // 收藏
    likeOnToggle = () => {
        this.props.onToggleLike({ like: !this.props.setList.music.like });
    }
    // toggle 播放列表
    songListToggle = () => {
        this.props.onSongListToggle({ songListShow: !this.props.setList.music.songListShow });
    }
    // 播放
    playOnToggle = (e) => {
        e.stopPropagation();
        const duration = Math.floor(document.getElementsByTagName('audio')[0].duration) //总时长
        const currentTime = Math.floor(document.getElementsByTagName('audio')[0].currentTime) //当前时间 
        if (this.props.setList.music.playstate) {
            document.getElementsByTagName('audio')[0].pause();
            clearInterval(this.timer)
        } else {
            document.getElementsByTagName('audio')[0].play();
            this.timer = setInterval(
                () => {
                    this.setState({ songCurrentTime: Math.floor(document.getElementsByTagName('audio')[0].currentTime), songCurrentTimeSlider: Math.floor((document.getElementsByTagName('audio')[0].currentTime / document.getElementsByTagName('audio')[0].duration) * 100) })
                },
                100
            );
        }
        this.setState({ songFullTime: duration })
        this.props.onPlayState({ playstate: !this.props.setList.music.playstate })
    }
    componentDidMount() {
        this.setState({ volume: document.getElementsByTagName('audio')[0].volume * 100 })
    }
    // 时间转换
    secondToDate = (result) => {
        // var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
        var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        return result = m + ":" + s;
    }
    // 改变声音
    soundChange = (value) => {
        this.setState({ volume: value });
        document.getElementsByTagName('audio')[0].volume = this.state.volume / 100;
    }
    // 下一首
    nextSong = () => {
        this.state.songData.filter((item, index) => {
            if (item.sid === this.props.setList.music.songId) {
                this.state.songData.filter((item2, index2) => {
                    if (index + 1 === index2) {
                        this.props.onChangeSongPlayNow({ 
                            songId: item2.sid,
                            src: item2.src,
                            songImg: item2.img,
                            songName: item2.name,
                            songAuthor: item2.author
                        });
                    }
                })
            }
        })
        // var audio = document.getElementsByTagName('audio')[0];
        // audio.src = this.props.setList.music.src;
        // audio.load();
        // audio.play();
        // audio.oncanplay = () => {
        //     this.setState({ songFullTime: audio.duration })
        // }
        // clearInterval(this.timer)
        // document.getElementsByTagName('audio')[0].play();
        // this.timer = setInterval(
        //     () => {
        //         this.setState({ songCurrentTime: Math.floor(audio.currentTime), songCurrentTimeSlider: Math.floor((audio.currentTime / audio.duration) * 100) })
        //     },
        //     100
        // );
        // this.props.onPlayState({ playstate: true })
    }
    // 上一首
    preSong = () => {
        this.state.songData.filter((item, index) => {
            if (item.sid === this.props.setList.music.songId) {
                this.state.songData.filter((item2, index2) => {
                    if (index - 1 === index2) {
                        this.props.onChangeSongPlayNow({ 
                            songId: item2.sid,
                            src: item2.src,
                            songImg: item2.img,
                            songName: item2.name,
                            songAuthor: item2.author
                        });
                    }
                })
            }
        })
        // var audio = document.getElementsByTagName('audio')[0];
        // audio.src = "http://oqimv5cbl.bkt.clouddn.com/%E5%86%AF%E6%8F%90%E8%8E%AB%20-%20%E4%BD%9B%E7%B3%BB%E5%B0%91%E5%A5%B3.mp3"
        // audio.load();
        // audio.play();
        // audio.oncanplay = () => {
        //     this.setState({ songFullTime: audio.duration })
        // }
        // clearInterval(this.timer)
        // this.timer = setInterval(
        //     () => {
        //         this.setState({ songCurrentTime: Math.floor(audio.currentTime), songCurrentTimeSlider: Math.floor((audio.currentTime / audio.duration) * 100) })
        //     },
        //     100
        // );
        // this.props.onPlayState({ playstate: true })
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.setList !== this.props.setList) {
            this.setState({ songData: nextProps.setList.music.data })
            if (nextProps.setList.music.src !== this.props.setList.music.src) {
                console.log(nextProps.setList.music.src)
                var audio = document.getElementsByTagName('audio')[0];
                audio.src = nextProps.setList.music.src;
                audio.load();
                audio.play();
                audio.oncanplay = () => {
                    this.setState({ songFullTime: audio.duration })
                }
                clearInterval(this.timer)
                document.getElementsByTagName('audio')[0].play();
                this.timer = setInterval(
                    () => {
                        this.setState({ songCurrentTime: Math.floor(audio.currentTime), songCurrentTimeSlider: Math.floor((audio.currentTime / audio.duration) * 100) })
                    },
                    100
                );
                this.props.onPlayState({ playstate: true })
            }
            return false
        } else {
            return true
        }
    }

    render() {
        const cuurentTime = this.secondToDate(this.state.songCurrentTime);
        const songFullTime = this.secondToDate(this.state.songFullTime);
        const menu = (
            <div style={{ height: 200, background: '#fff', width: 34, marginBottom: 12, border: '1px solid #ccc', borderRadius: 5, padding: '5px 0px' }}>
                <Slider tipFormatter={null} vertical defaultValue={this.state.volume} style={{ height: 180 }} onChange={this.soundChange} onAfterChange={this.soundChange} />
            </div>
        );
        return (
            <div className='player'>
                <audio id="audioPlayer" ref="audio" controls="controls" loop="loop" preload="auto" style={{ display: 'none' }}>
                    <source src={this.props.setList.music.src} type="audio/mpeg" />
                </audio>
                <div className='player_img'>
                    <img src={this.props.setList.music.songImg} />
                    <div className='songDetail'>
                        <div className='songName' title={this.props.setList.music.songName}>{this.props.setList.music.songName}</div>
                        <div className='songAythor' title={this.props.setList.music.songAuthor}>{this.props.setList.music.songAuthor}</div>
                    </div>
                    <div className='player_icon'>
                        <span onClick={this.preSong}><Icon type="left-circle" style={{ color: iconColor }} /></span>
                        <span onClick={this.playOnToggle}><Icon type={this.props.setList.music.playstate ? "pause-circle" : "play-circle"} style={{ color: iconColor }} /></span>
                        <span onClick={this.nextSong}><Icon type="right-circle" style={{ color: iconColor }} /></span>
                    </div>
                    <div className='player_slider'>
                        <Slider tipFormatter={null} step={0.01} value={this.state.songCurrentTimeSlider} />
                    </div>
                    <div className='player_icon playControll'>
                        <span className='songTime'>{cuurentTime}/{songFullTime}</span>
                        <span onClick={this.likeOnToggle}><Icon type={this.props.setList.music.like ? "heart" : "heart-o"} style={this.props.setList.music.like ? { color: like } : {}} /></span>
                        <span>
                            <Dropdown overlay={menu} placement="topCenter">
                                <Icon type="notification" />
                            </Dropdown>
                        </span>
                        <div className="songList" onClick={this.songListToggle}>
                            <Icon type="bars" />
                            <span>20</span>
                        </div>
                    </div>
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
        onPlayState: (bool) => {
            dispatch(Actions.songPlayState(bool));
        },
        onToggleLike: (bool) => {
            dispatch(Actions.songLike(bool));
        },
        onSongListToggle: (bool) => {
            dispatch(Actions.songListToggle(bool));
        },
        onChangeSongPlayNow: (data) => {
            dispatch(Actions.songPlayNow(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);