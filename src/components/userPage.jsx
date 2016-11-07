import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { thunkActions } from '../actions';

const UserPoll = ({ poll }) => {
  const date = new Date(poll.dateUpdated);

  const totalVotes = poll.options.reduce((curr, next) => curr + next.votes, 0);
  const sortedOptions = Object.assign([], poll.options).sort((a, b) => a.votes > b.votes).reverse().slice(0, 3);

  return (
    <div className="comment-container">
      <div className="comment-body center">
        <h2>
          <Link to={`/page/poll/${poll._id}`}>
            { poll.title }
          </Link>
        </h2>
        <h4>Top 3 Options: </h4>
        <div id="top-options">
          { sortedOptions.map((option, i) => {
            // Find percent of votes; if no votes yet, defaults to 0%
            const percent = totalVotes === 0
              ? 0 : Math.round((option.votes / totalVotes) * 100, 2);
            return (
              <div className="row" key={i}>
                <div className="col-10">
                  { option.title }
                </div>
                <div className="col-2">
                  { `${percent}%`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="comment-foot">
        <span id="comment-author" className="comment-foot-item">Total Votes: { totalVotes }</span>
        <span id="comment-date" className="comment-foot-item right">{date.toLocaleString()}</span>
      </div>
    </div>
  );
};

const UserPage = ({ user, userView, dispatch, params }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);
  thunkBind.getUserView(params.userId);
  // If this loads initially, then we need to wait for Promise Thunk to return
  if (!userView) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="page-main row">
        <div className="poll-head">{userView.user.name}</div>
        <div className="poll-info">
          <div className="user-image">
            <img alt="user-image" src={userView.user.profileImageUrl} />
          </div>
          <div className="user-info">
            <h2>{userView.user.name}</h2>
            <h4>{userView.user.screenName}</h4>
            <h4>{userView.user.location}</h4>
          </div>
        </div>
        <div className="poll-foot">
          <div style={{display: 'inline-block'}}>
            Polls Created: {userView.polls.length}
          </div>
          <div style={{float: 'right'}}>
            Registered Votes: {userView.user.pollsVoted.length}
          </div>
        </div>
      </div>
      {
        !user || user._id === userView.user._id
        ? (
          <div className="comments">
            { userView.polls.map((poll, i) => <UserPoll poll={poll} key={i} />) }
          </div>
        ) : null
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user'),
    userView: state.reducer.get('userView')
  };
};

export default connect(mapStateToProps)(UserPage);
