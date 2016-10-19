import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import marked from 'marked';

import { thunkActions } from '../actions';

import { Comments, Graph, Options } from './index';

const markupPoll = desc => {
  return { __html: marked(desc, { sanitize: true }) };
};

const Poll = ({ polls, user, dispatch, params, children }) => {
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

  return (
    <div className="container">
      <div className="page-main row">
        <h3>{poll.title}</h3>
        {children}
        <p>Author: {poll.author.name}</p>
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
