import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { actions, thunkActions } from '../actions';

const onSubmit = (poll, voteUp, voteAdd) => {
  return e => {
    e.preventDefault();
    const elem = Array.from(e.target).find(radio => radio.checked);

    // Alerts user if no option selected
    if (!elem) return alert('Please select an option.');
    // Alerts user if they chose a custom vote, but did not enter text
    if (!elem.value.trim() || !elem.value.match(/\w|\d|[:)(]/)) {
      return alert('Please add text before submitting.');
    }

    browserHistory.push(`/page/poll/${poll._id}/results`);

    if (elem.id === 'option-add') {
      return voteAdd(poll._id, elem.value);
    }

    const voteId = elem.value;

    return voteUp(poll._id, voteId);
  };
};

// Clicks radio button when text input is selected
const focusOn = e => document.getElementById('option-add').click();

const Options = ({ poll, storedInput, user, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);
  const actionBind = bindActionCreators(actions, dispatch);

  let selectedVoteId;

  if (storedInput === null) actionBind.storeOptionInput('');

  if (user && user.pollsVoted.find(item => item.pollId === poll._id)) {
    const selectedPoll = user.pollsVoted.find(item => item.pollId === poll._id);
    selectedVoteId = selectedPoll.optionId;
  }
  return (
    <form className="options" onSubmit={onSubmit(poll, thunkBind.votePoll, thunkBind.voteAdd)}>
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
      <div className="option-container">
        <input
          id="option-add"
          type="radio"
          name="option"
          value={storedInput}
        />
        <label htmlFor="option-add" className="option">
          <input
            value={storedInput}
            placeholder="Your own option here..."
            onChange={e => actionBind.storeOptionInput(e.target.value)}
            onClick={focusOn}
            type="text"
            className="option-add-input"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-submit">Vote</button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    polls: state.reducer.get('polls'),
    storedInput: state.reducer.get('storedInput'),
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Options);
