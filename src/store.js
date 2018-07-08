import { createStore, combineReducers } from 'redux';
import {musicPlayReducer as musicReducer} from './play/index';

const reducer = combineReducers({
  music: musicReducer
})
const store = createStore(reducer, {});

export default store;