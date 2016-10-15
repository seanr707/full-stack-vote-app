import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions/index.jsx';

const Poll = ({ poll, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const miliseconds = 1000 * 60 * 60 * 24;

  // const timeText = poll.dateUpdated > poll.dateAdded ? 'Updated' : 'Added';

  const date = poll.dateUpdated < poll.dateUpdated + miliseconds
    ? new Date(poll.dateUpdated).toLocaleTimeString().replace(/:[0-9][0-9]\s/, ' ')
    : new Date(poll.dateUpdated).toLocaleDateString();

  return (
    <div className="poll-tile row">
      <Link to={`/page/poll/${poll._id}`}>
        <h3 title={`"${poll.desc.substr(0, 20)}..."`} className="col-8">
          {poll.title}
        </h3>
        <div className="poll-info-container col-4">
          <div className="poll-info-item">By {poll.author.name}</div>
          <div className="poll-info-item">{date}</div>
        </div>
      </Link>
    </div>
  );
};

export default connect()(Poll);
