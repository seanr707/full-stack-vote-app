import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions/index.jsx';

const Poll = ({ poll, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  return (
    <div className="poll-tile">
      <h3 title={poll.desc.substr(0, 20)}>
        <Link to={`/page/poll/${poll._id}`}>{poll.title}</Link>
      </h3>
      <p>Author: {poll.author.name}</p>
    </div>
  );
};

export default connect()(Poll);
