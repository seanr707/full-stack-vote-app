import axios from 'axios';

export const actionTypes = {
  ADD_POLL: 'ADD_POLL',
  VOTE_ON: 'VOTE_ON',
  UPDATE_POLL: 'UPDATE_POLL',
  UPDATE_POLLS: 'UPDATE_POLLS',
  LOGIN: 'LOGIN'
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
  }
};

export const thunkActions = {
  postPoll: (poll) => {
    return dispatch => {
      return axios.post('/poll/add', poll).then(
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
    return dispatch => {
      return axios.put(`/poll/id/${pollId}/vote/${optionId}`).then(
        res => {
          console.log(res.data);
          dispatch(actions.updatePoll(res.data))
        },
        err => console.log(err)
      );
    };
  },
  getAllPolls: () => {
    return dispatch => {
      console.log('updating polls...');
      return axios.get('/poll/all').then(
        res => dispatch(actions.updateAllPolls(res.data)),
        err => console.error(err)
      );
    };
  },
  deletePoll: (id) => {
    return dispatch => {
      return axios.delete('/poll/id/' + id).then(
        res => dispatch(thunkActions.getAllPolls()),
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
