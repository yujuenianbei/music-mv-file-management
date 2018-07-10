import { createStore, combineReducers } from 'redux';
import {musicPlayReducer as musicReducer} from './play/index';
import {musicListReducer as musiclistReducer} from './layout/musicupload/index';
const reducer = combineReducers({
  music: musicReducer,
  musicList: musiclistReducer
})
const store = createStore(reducer, {});

export default store;