import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import { Main, EditComment, EditPost, Graph, PollPage, Polls, SubmitPost, VotePage } from './components';
import reducer from './reducers';
import routes from './routes';

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
      <Route path="/" component={Main}>
        <IndexRoute component={Polls} />
        <Route path="/page/submit" component={SubmitPost} />
        <Route path="/page/poll/:pollId" component={PollPage}>
          <IndexRoute component={VotePage} />
          <Route path="/page/poll/:pollId/results" component={Graph} />
        </Route>
        <Route path="/page/poll/:pollId/edit" component={EditPost} />
        <Route path="/page/poll/:pollId/comments/:commentId/edit" component={EditComment} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
