import {
  ADD_SONG,
  ADD_LIST,
} from '../action/index'

const initValue = {
  addSongModle: false
}
export default (state = initValue, action) => {
  switch (action.type) {
    // 获取原先的列表内容
    case ADD_SONG: {
      return Object.assign({}, state, action.data)
    }
    // 将新增加的列表内容写入
    case ADD_LIST: {
      return Object.assign({}, state, action.data)
    }
    default: {
      return state;
    }
  }
}