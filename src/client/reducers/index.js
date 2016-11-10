import { Map, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { actionTypes } from '../actions';

const initialState = Map({
  polls: null,
  // Made empty string for value of option input on options.jsx
  storedInput: '',
  user: null,
  userView: null
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ADD_POLL:
    return state.set('polls', state.get('polls').reverse().push(action.poll).reverse());
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
    return state.set('storedInput', action.input);
  case actionTypes.STORE_USER_VIEW_INFO:
    return state.set('userView', action.user);
  // Empties storedInput when the page is changed
  case LOCATION_CHANGE:
    return state.set('storedInput', '');
  default:
    return state;
  }
};

export default reducer;
