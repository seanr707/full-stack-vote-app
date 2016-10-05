import { Map, List } from 'immutable';

import { actionTypes } from '../actions/index.jsx';

const initialState = Map({
  polls: undefined,
  user: undefined
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ADD_POLL:
    return state.set('polls', state.get('polls').push(action.poll));
  case actionTypes.UPDATE_POLL:
    console.log('state');
    console.log(state);
    console.log('Incoming data');
    console.log(action.poll);
    return state.set('polls', state.get('polls').map(poll => {
      return action.poll._id === poll._id ? action.poll : poll;
    }));
  case actionTypes.UPDATE_POLLS:
    console.log('updating poll display...');
    return state.set('polls', List(action.polls));
  case actionTypes.LOGIN:
    console.log(state);
    console.log(action.user);
    return state.set('user', action.user);
  default:
    console.log(state);
    return state;
  }
};

export default reducer;
