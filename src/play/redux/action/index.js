export const SET_List = 'SET_List';
export const ADD_LIST = 'ADD_LIST';
export const SONG_LIKE = 'SONG_LIKE';
export const SONG_LIST_TOGGLE = 'SONG_LIST_TOGGLE';
export const SONG_PLAY_STATE = 'SONG_PLAY_STATE';
export const SONG_PLAY_NOW = 'SONG_PLAY_NOW';
// 后台获取数据
export function setList(data) {
    return {
        type: SET_List,
        data
    }
}
// 添加歌曲到播放列表
export function addList(data) {
    return {
        type: ADD_LIST,
        data
    }
}
// 收藏歌曲
export function songLike(data) {
    return {
        type: SONG_LIKE,
        data
    }
}
// 打开播放列表
export function songListToggle(data) {
    return {
        type: SONG_LIST_TOGGLE,
        data
    }
}
// 播放
export function songPlayState(data) {
    return {
        type: SONG_PLAY_STATE,
        data
    }
}
// 修改当前歌曲信息
export function songPlayNow(data) {
    return {
        type: SONG_PLAY_NOW,
        data
    }
}