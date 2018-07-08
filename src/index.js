import React from 'react';
import ReactDOM from 'react-dom';
import './main.less';
import {Provider} from 'react-redux';
import Main from './main';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store'

const store = configureStore
class SiderDemo extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

ReactDOM.render(<SiderDemo />, document.getElementById('root'));
registerServiceWorker();
