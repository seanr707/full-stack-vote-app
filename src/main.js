import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import App from './components/index.jsx';
import Poll from './components/poll.jsx';
import RouterTry from './components/router-test.jsx';
import Polls from './components/polls.jsx';
import reducer from './reducers/index.jsx';
import { thunkActions } from './actions/index.jsx';

import './styles/index.scss';

const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer
  }),
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Polls} />
        <Route path="/poll/:pollId" component={Poll} />
        <Route path="/testing" component={RouterTry} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

console.log('ready to update...');
store.dispatch(thunkActions.getAllPolls());
store.dispatch(thunkActions.verifyUser());
