import React from 'react';
import { connect } from 'react-redux';

import Poll from './poll.jsx';

const Polls = ({ polls, dispatch }) => {
  if (!polls) return <div>Loading...</div>;

  return (
    <div className="poll-container">
      {polls.map((poll, i) => {
        return (
          <Poll key={i} poll={poll} />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    polls: state.reducer.get('polls')
  };
};

export default connect(mapStateToProps)(Polls);
