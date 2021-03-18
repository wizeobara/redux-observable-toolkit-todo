import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './state-mgmt/store/index';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from "connected-react-router";

// entry point to attach react app to root of the element
// Also point of linkage for redux store and react-router definitions
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
