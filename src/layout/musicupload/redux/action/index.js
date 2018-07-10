export const ADD_SONG = 'ADD_SONG';
export const ADD_LIST = 'ADD_LIST';

// 新增歌曲
export function addSong(data) {
    return {
        type: ADD_SONG,
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