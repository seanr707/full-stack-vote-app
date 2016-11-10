import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import marked from 'marked';

import { thunkActions } from '../actions';

import { LoginButton, Options } from './index';

const markupPoll = desc => {
  return { __html: marked(desc, { sanitize: true }) };
};

const VotePage = ({ polls, user, dispatch, params }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);
  const poll = polls.find(poll => poll._id === params.pollId);

  // Will be used to align text if it is a small amount
  const descAlign = { textAlign: 'center' };

  const removeClick = pollId => e => {
    thunkBind.deletePoll(pollId);
    browserHistory.goBack();
  };

  const editButtons = (
    <span>
      <Link to={`/page/poll/${poll._id}/edit`}>
        <button type="button" className="btn btn-default">
          Edit
        </button>
      </Link>
      <button type="button" className="btn btn-remove" onClick={removeClick(poll._id)}>
        Delete
      </button>
    </span>
  );

  const shareButton = (
    <a href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20poll%20"${poll.title}"&url=${location.href}`} target="_blank">
      <button type="button" className="btn btn-login">
        <div className="login-btn-container">
          <img className="login-btn-img" src="/public/img/twitter-logo-white.png" />
          <span className="login-btn-text">Share</span>
        </div>
      </button>
    </a>
  );

  const loggedInButtons = (
    <div className="center">
      <span style={{ display: 'inline-flex' }}>
        { shareButton }
        { user && poll.author.id === user._id ? editButtons : null }
      </span>
    </div>
  );

  return (
    <div className="poll-info">
      <p
        id="poll-desc"
        dangerouslySetInnerHTML={markupPoll(poll.desc)}
        style={poll.desc.length > 50 ? descAlign : null}
      />
      {
        poll.authRequired && !user
          ? <LoginButton />
          : <Options poll={poll} user={user} />
      }
      { user ? loggedInButtons : null }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    polls: state.reducer.get('polls'),
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(VotePage);
