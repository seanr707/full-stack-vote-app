import React from 'react';
import { connect } from 'react-redux';

import { Poll } from './index';

const Polls = ({ polls, dispatch }) => {
  if (!polls) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="poll-container">
        {polls.map((poll, i) => {
          return (
            <Poll key={i} poll={poll} />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    polls: state.reducer.get('polls')
  };
};

export default connect(mapStateToProps)(Polls);
