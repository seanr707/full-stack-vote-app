import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import marked from 'marked';

import { thunkActions } from '../actions/index.jsx';

import { Comments, Graph } from './index';

const markupPoll = desc => {
  return { __html: marked(desc, { sanitize: true }) };
};

const Poll = ({ polls, user, dispatch, params }) => {
  // If this loads initially, then we need to wait for Promise Thunk to return
  if (!polls) return <div>Loading...</div>;

  const thunkBind = bindActionCreators(thunkActions, dispatch);
  const poll = polls.find(poll => poll._id === params.pollId);

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

  const editButtons = (
    <div className="button-container">
      <button onClick={() => thunkBind.editPoll(poll._id, tempPoll)}>Edit</button>
      <button onClick={() => thunkBind.deletePoll(poll._id)}>Delete</button>
    </div>
  );

  return (
    <div className="container">
      <div className="page-main row">
        <div className="pollInfo col-8">
          <h3>{poll.title}</h3>
          <p dangerouslySetInnerHTML={markupPoll(poll.desc)} />
          <ul>
            {poll.options.map((option, i) => {
              return (
                <li key={i} onClick={() => thunkBind.votePoll(poll._id, option._id)}>
                  {option.title}: {option.votes}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="graph col-4">
          <Graph votes={poll.options} />
        </div>
        <p>Author: {poll.author.name}</p>
        {user && poll.author.id === user._id ? editButtons : null}
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
