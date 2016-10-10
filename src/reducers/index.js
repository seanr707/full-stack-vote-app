import { Map, List } from 'immutable';

import { actionTypes } from '../actions/index.jsx';

const initialState = Map({
  polls: null,
  user: null
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ADD_POLL:
    return state.set('polls', state.get('polls').push(action.poll));
  case actionTypes.UPDATE_POLL:
    return state.set('polls', state.get('polls').map(poll => {
      return action.poll._id === poll._id ? action.poll : poll;
    }));
  case actionTypes.UPDATE_POLLS:
    return state.set('polls', List(action.polls));
  case actionTypes.LOGIN:
    return state.set('user', action.user);
  case actionTypes.LOGOUT:
    return state.set('user', null);
  default:
    console.log(state);
    return state;
  }
};

export default reducer;
