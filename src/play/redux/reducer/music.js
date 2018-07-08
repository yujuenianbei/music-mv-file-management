import {
  SET_List,
  ADD_LIST,
  SONG_LIKE,
  SONG_LIST_TOGGLE,
  SONG_PLAY_STATE,
  SONG_PLAY_NOW,
} from '../action/index'

const initValue = {
  playState: false,
  like: true,
  songListShow: true,
  songId: 1,
  songImg: 'http://p1.music.126.net/BfcRJ5f3Tu988TPBhrhZ6Q==/7916483720778040.jpg',
  songName: 'Trip',
  songAuthor: "Axero",
  src: 'http://oqimv5cbl.bkt.clouddn.com/Vonikk%20-%20Phoenix.mp3',
  data: []
}
export default (state = initValue, action) => {
  switch (action.type) {
    // 获取原先的列表内容
    case SET_List: {
      return Object.assign({}, state, action.data)
    }
    // 将新增加的列表内容写入
    case ADD_LIST: {
      return Object.assign({}, state, action.data)
    }
    // 收藏歌曲
    case SONG_LIKE: {
      return Object.assign({}, state, action.data)
    }
    // 打开播放列表
    case SONG_LIST_TOGGLE: {
      return Object.assign({}, state, action.data)
    }
    // 播放
    case SONG_PLAY_STATE: {
      return Object.assign({}, state, action.data)
    }
    // 修改当前歌曲信息
    case SONG_PLAY_NOW: {
      return Object.assign({}, state, action.data)
    }
    default: {
      return state;
    }
  }
}