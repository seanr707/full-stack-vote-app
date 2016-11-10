import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions';

const Poll = ({ poll, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const miliseconds = 1000 * 60 * 60 * 24;

  // const timeText = poll.dateUpdated > poll.dateAdded ? 'Updated' : 'Added';

  const date = Date.now() < (poll.dateUpdated + miliseconds)
    // If less than a day old, display exact time (without the seconds value)
    ? new Date(poll.dateUpdated).toLocaleTimeString().replace(/:[0-9][0-9]\s/, ' ')
    : new Date(poll.dateUpdated).toLocaleDateString();

  return (
    <div className="poll-tile flexbox" onClick={() => browserHistory.push(`/page/poll/${poll._id}`)}>
      <div className="col-1">
        <p className="center">
          { poll.authRequired ? <span className="tag">Verified</span> : null }
        </p>
      </div>
      <div className="col-8">
        <h3 title={poll.title}>
          { poll.title.length > 40 ? `${poll.title.substr(0, 40)}...` : poll.title }
        </h3>
      </div>

      <div className="poll-info-container col-4">
        <div className="poll-info-item">
          {poll.author.name} (@{poll.author.username})
        </div>
        <div className="poll-info-item">{date}</div>
      </div>
    </div>
  );
};

export default connect()(Poll);
