import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store'
import App from './views/App'
import { loading } from './lib/utils'
import * as serviceWorker from './serviceWorker';

import './assets/styles/index.scss';
const store = createStore()
window._loading = loading

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
serviceWorker.unregister();
