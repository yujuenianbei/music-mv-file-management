import React from 'react'
import './main.less'
import {  Menu, Dropdown, Button, Slider, Icon } from 'antd';
import logo from './static/xuezhiqian.jpg';

const iconColor = '#001529'
const like = '#f5222d'
// const url = 'http://m10.music.126.net/20180704011605/33a52e92faef2c1d66cae53bcc452baa/ymusic/cdf5/ff48/7df3/1d501aa2c7e106594e03521e64c18715.mp3'
const url = 'http://localhost:4000'
class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            like: false,
            playstate: false,
            volume: 0,
            songFullTime: 0,
            songCurrentTime: 0,
            songCurrentTimeSlider: 0,
        },
            this.likeOnToggle = this.likeOnToggle.bind(this);
        this.playOnToggle = this.playOnToggle.bind(this);
        this.playTime = this.playTime.bind(this);
        this.secondToDate = this.secondToDate.bind(this);
        this.soundChange = this.soundChange.bind(this);
        // this.formatter = this.formatter.bind(this)
    }
    // formatter(value) {
    //     return `${value}`;
    // }
    likeOnToggle = () => {
        this.setState({ like: !this.state.like });
    }
    playOnToggle = (e) => {
        e.stopPropagation();
        // console.log(document.getElementById('audioPlayer').currentTime);
        // console.log(document.getElementById('audioPlayer').duration);
        const duration = Math.floor(document.getElementById('audioPlayer').duration) //总时长
        const currentTime = Math.floor(document.getElementById('audioPlayer').currentTime) //当前时间 
        if (this.state.playstate) {
            document.getElementById('audioPlayer').pause();
            clearInterval(this.timer)
        } else {
            document.getElementById('audioPlayer').play();
            this.timer = setInterval(
                () => {
                    this.setState({ songCurrentTime: Math.floor(document.getElementById('audioPlayer').currentTime), songCurrentTimeSlider: Math.floor((document.getElementById('audioPlayer').currentTime / document.getElementById('audioPlayer').duration) * 100) })
                },
                1000
            );
        }
        this.setState({ playstate: !this.state.playstate, songFullTime: duration })
    }
    playTime = () => {
        const sliderNum = this.state.songCurrentTimeSlider;
    }
    componentDidMount() {
        this.setState({volume: document.getElementById('audioPlayer').volume*100})
    }
    // 时间转换
    secondToDate(result) {
        // var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
        var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        return result = m + ":" + s;
    }
    // 改变声音
    soundChange = (value) => {
        this.setState({volume: value});
        document.getElementById('audioPlayer').volume = this.state.volume/100;
    } 
    render() {
        const cuurentTime = this.secondToDate(this.state.songCurrentTime);
        const songFullTime = this.secondToDate(this.state.songFullTime);

        const menu = (
            <div style={{ height: 200,background:'#ccc',width: 34,marginBottom:10,borderRadius: 5,padding:'5px 0px' }}>
                <Slider tipFormatter={null} vertical defaultValue={this.state.volume} style={{height: 180}} onChange={this.soundChange} onAfterChange={this.soundChange}/>
            </div>
          );
        return (
            <div className='player'>
                <audio id="audioPlayer" ref="audio" controls="controls" loop="loop" src={url} style={{ display: 'none' }}></audio>
                <div className='player_img'>
                    <img src={logo} />
                    <div className='player_icon'>
                        <span><Icon type="left-circle" style={{ color: iconColor }} /></span>
                        <span onClick={this.playOnToggle}><Icon type={this.state.playstate ? "pause-circle" : "play-circle"} style={{ color: iconColor }} /></span>
                        <span><Icon type="right-circle" style={{ color: iconColor }} /></span>
                    </div>
                    <div className='player_slider'>
                        <Slider tipFormatter={null} step={0.01} value={this.state.songCurrentTimeSlider} />
                    </div>
                    <div className='player_icon'>
                        <span className='songTime'>{cuurentTime}/{songFullTime}</span>
                        <span onClick={this.likeOnToggle}><Icon type={this.state.like ? "heart" : "heart-o"} style={this.state.like ? { color: like } : {}} /></span>
                        <span>
                            <Dropdown overlay={menu} placement="topCenter">
                                <Icon type="notification" />
                            </Dropdown>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player