import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/index.jsx';
import reducer from './reducers/index.jsx';
import { thunkActions } from './actions/index.jsx';

import './styles/index.scss';

let store = createStore(
  reducer,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

console.log('ready to update...');
store.dispatch(thunkActions.getAllPolls());
store.dispatch(thunkActions.verifyUser());
