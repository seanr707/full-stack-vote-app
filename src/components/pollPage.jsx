import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { thunkActions } from '../actions';

import { Comments } from './index';

const Poll = ({ polls, user, dispatch, params, children }) => {
  // If this loads initially, then we need to wait for Promise Thunk to return
  if (!polls || polls.size === 0) return <div className="container">Loading...</div>;

  const thunkBind = bindActionCreators(thunkActions, dispatch);
  const poll = polls.find(poll => poll._id === params.pollId);

  return (
    <div className="container">
      <div className="page-main row">
        <div className="poll-head">{poll.title}</div>
        {children}
        <div className="poll-foot">
          <div style={{display: 'inline-block'}}>
            {poll.author.name}
            <Link to={`/page/user/${poll.author.id}`}>
              <span className="user-link">(@{poll.author.username})</span>
            </Link>
          </div>
          <div style={{float: 'right'}}>
            {new Date(poll.dateUpdated).toLocaleString()}
          </div>
        </div>
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
