import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import { Main, PollPage, Polls } from './components';
import reducer from './reducers';
import routes from './routes';
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
    <Router history={history} routes={routes}>
      <Route path="/" component={Main}>
        <IndexRoute component={Polls} />
        <Route path="/poll/page/:pollId" component={PollPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
