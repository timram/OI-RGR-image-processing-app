import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import AppComponent from './components/index.jsx';

const store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('app')
);
