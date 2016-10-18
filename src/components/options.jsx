import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions';

const onSubmit = (poll, callback) => {
  return e => {
    e.preventDefault();
    const voteId = Array.from(e.target).find(radio => radio.checked).value;
    return callback(poll._id, voteId);
  };
};

const Options = ({ poll, user, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  let selectedVoteId;

  if (user && user.pollsVoted.find(item => item.pollId === poll._id)) {
    const selectedPoll = user.pollsVoted.find(item => item.pollId === poll._id);
    selectedVoteId = selectedPoll.optionId;
  }
  return (
    <form className="options" onSubmit={onSubmit(poll, thunkBind.votePoll)}>
      {poll.options.map((option, i) => {
        return (
          <div className="option-container" key={i}>
            <input
              id={`option-${i}`}
              type="radio"
              name="option"
              value={option._id}
              defaultChecked={selectedVoteId === option._id}
            />
            <label htmlFor={`option-${i}`} className="option">
              {option.title}
            </label>
          </div>
        );
      })}
      <button type="submit" className="btn btn-default">Vote</button>
    </form>
  );
};
const mapStateToProps = state => {
  return {
    polls: state.reducer.get('polls'),
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Options);
