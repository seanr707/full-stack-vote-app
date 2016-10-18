import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import marked from 'marked';

import { thunkActions } from '../actions/index.jsx';

import { Comments, Graph } from './index';

const markupPoll = desc => {
  return { __html: marked(desc, { sanitize: true }) };
};

const Poll = ({ polls, user, dispatch, params }) => {
  // If this loads initially, then we need to wait for Promise Thunk to return
  if (!polls) return <div>Loading...</div>;

  const thunkBind = bindActionCreators(thunkActions, dispatch);
  const poll = polls.find(poll => poll._id === params.pollId);

  const editButtons = (
    <div className="button-container">
      <button onClick={() => thunkBind.editPoll(poll._id, tempPoll)}>Edit</button>
      <button onClick={() => thunkBind.deletePoll(poll._id)}>Delete</button>
    </div>
  );

  const onSubmit = e => {
    e.preventDefault();
    const voteId = Array.from(e.target).find(radio => radio.checked).value;
    thunkBind.votePoll(poll._id, voteId);
  };

  const options = () => {
    let selectedVoteId;

    if (user && user.pollsVoted.find(item => item.pollId === poll._id)) {
      const selectedPoll = user.pollsVoted.find(item => item.pollId === poll._id);
      selectedVoteId = selectedPoll.optionId;
    }
    return (
      <form className="options" onSubmit={onSubmit}>
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

  return (
    <div className="container">
      <div className="page-main row">
        <div className="pollInfo col-8">
          <h3>{poll.title}</h3>
          <p dangerouslySetInnerHTML={markupPoll(poll.desc)} />
          {options()}
        </div>
        <div className="graph col-4">
          <Graph votes={poll.options} />
        </div>
        <p>Author: {poll.author.name}</p>
        {user && poll.author.id === user._id ? editButtons : null}
      </div>
      <Comments pollId={poll._id} comments={poll.comments} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    polls: state.reducer.get('polls'),
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Poll);
