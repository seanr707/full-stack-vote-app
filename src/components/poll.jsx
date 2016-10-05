import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions/index.jsx';

const Poll = ({ poll, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const tempPoll = {
    update: {
      title: 'Edited poll here',
      desc: 'I was edited',
      author: {
        _id: null,
        name: 'n/a'
      },
      options: [
        {
          title: 'Yeah',
          votes: 0
        },
        {
          title: 'Not here',
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 5).toString(),
          votes: 0
        }
      ]
    }
  };

  return (
    <div className="poll">
      <h3>{poll.title}</h3>
      <p>{poll.desc}</p>
      <ul>
        {poll.options.map((option, i) => {
          return (
            <li key={i} onClick={() => thunkBind.votePoll(poll._id, option._id)}>
                {option.title}: {option.votes}
            </li>
          );
        })}
      </ul>
      <p>Author: {poll.author.name}</p>
      <div className="button-container">
        <button onClick={() => thunkBind.editPoll(poll._id, tempPoll)}>Edit</button>
        <button onClick={() => thunkBind.deletePoll(poll._id)}>Delete</button>
      </div>
    </div>
  );
};

export default connect()(Poll);
