import { Map, List } from 'immutable';

import { actionTypes } from '../actions';

const initialState = Map({
  polls: null,
  storedInput: null,
  user: null,
  userView: null
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
  case actionTypes.STORE_OPTION_INPUT:
    return state.set('storedInput', List(action.input));
  case actionTypes.STORE_USER_VIEW_INFO:
    return state.set('userView', action.user);
  default:
    console.log(state);
    return state;
  }
};

export default reducer;
