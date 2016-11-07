import axios from 'axios';

export const actionTypes = {
  ADD_POLL: 'ADD_POLL',
  VOTE_ON: 'VOTE_ON',
  UPDATE_POLL: 'UPDATE_POLL',
  UPDATE_POLLS: 'UPDATE_POLLS',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  STORE_OPTION_INPUT: 'STORE_OPTION_INPUT',
  CLEAR_OPTION_INPUT: 'CLEAR_OPTION_INPUT',
  STORE_USER_VIEW_INFO: 'STORE_USER_VIEW_INFO',
  CLEAR_USER_VIEW_INFO: 'CLEAR_USER_VIEW_INFO'
};

export const actions = {
  addPoll: (poll) => {
    return {
      type: actionTypes.ADD_POLL,
      poll
    };
  },
  voteOn: (id, option) => {
    return {
      type: actionTypes.VOTE_ON,
      id,
      option
    };
  },
  updatePoll: (poll) => {
    return {
      type: actionTypes.UPDATE_POLL,
      poll
    };
  },
  updateAllPolls: (polls) => {
    return {
      type: actionTypes.UPDATE_POLLS,
      polls
    };
  },
  login: (user) => {
    console.log(user);
    return {
      type: actionTypes.LOGIN,
      user
    };
  },
  logout: () => {
    return {
      type: actionTypes.LOGOUT
    };
  },
  storeOptionInput: (input) => {
    return {
      type: actionTypes.STORE_OPTION_INPUT,
      input
    };
  },
  clearOptionInput: () => {
    return {
      type: actionTypes.CLEAR_OPTION_INPUT
    };
  },
  storeUserViewInfo: (user) => {
    return {
      type: actionTypes.STORE_USER_VIEW_INFO,
      user
    };
  },
  clearUserViewInfo: () => {
    return {
      type: actionTypes.CLEAR_USER_VIEW_INFO
    };
  }
};

export const thunkActions = {
  postPoll: (poll) => {
    return dispatch => {
      return axios.post('/polls', poll).then(
        res => dispatch(actions.addPoll(res.data)),
        err => console.error(err)
      );
    };
  },
  editPoll: (id, update) => {
    return dispatch => {
      console.log(id);
      console.log(update);
      return axios.put(`/poll/id/${id}`, update).then(
        res => dispatch(actions.updatePoll(res.data)),
        err => console.error(err)
      );
    };
  },
  votePoll: (pollId, optionId) => {
    return (dispatch, getState) => {
      const { reducer } = getState();
      return axios.put(`/poll/id/${pollId}/vote/${optionId}`).then(
        res => {
          console.log(res.data);
          dispatch(actions.updatePoll(res.data));
          dispatch(thunkActions.verifyUser(reducer.get('_id')));
        },
        err => console.log(err)
      );
    };
  },
  getAllPolls: () => {
    return dispatch => {
      dispatch(actions.updateAllPolls(null));
      console.log('updating polls...');
      return axios.get('/polls').then(
        // Reverse order so it starts with the newest on top
        res => dispatch(actions.updateAllPolls(res.data)),
        err => console.error(err)
      );
    };
  },
  deletePoll: (id) => {
    return dispatch => {
      return axios.delete(`/poll/id/${id}`).then(
        res => dispatch(thunkActions.getAllPolls()),
        err => console.error(err)
      );
    };
  },
  addComment: (id, comment) => {
    return dispatch => {
      axios.post(`/poll/id/${id}/comments`, { comment }).then(
        res => dispatch(actions.updatePoll(res.data)),
        err => console.error(err)
      );
    };
  },
  updateComment: (pollId, commentId, text) => {
    return dispatch => {
      axios.put(`/poll/id/${pollId}/comments/${commentId}`, { update: text }).then(
        res => dispatch(actions.updatePoll(res.data)),
        err => console.error(err)
      );
    };
  },
  deleteComment: (pollId, commentId) => {
    return dispatch => {
      axios.delete(`/poll/id/${pollId}/comments/${commentId}`).then(
        res => dispatch(actions.updatePoll(res.data)),
        err => console.error(err)
      );
    };
  },
  getUserView: (userId) => {
    return dispatch => {
      axios.get(`/users/id/${userId}`).then(
        res => dispatch(actions.storeUserViewInfo(res.data)),
        err => console.error(err)
      );
    };
  },
  verifyUser: (id) => {
    return dispatch => {
      return axios.get('/auth/check').then(
        res => dispatch(actions.login(res.data)),
        err => console.error(err)
      );
    };
  }
};
