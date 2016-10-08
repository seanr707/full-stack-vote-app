import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions/index.jsx';

const Toolbar = ({ user, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const getClick = () => {
    thunkBind.getAllPolls();
  };

  const newClick = () => {
    thunkBind.postPoll({
      title: 'New poll',
      desc: 'Uses thunk',
      author: {
        id: user._id,
        name: user.name
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
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        }
      ]
    });
  };
  console.log('Toolbar');
  console.log(!user);
  return (
    <div className="toolbar">
      <button className="btn btn-default" onClick={getClick}>
        Refresh
      </button>
      { /* <Link to="/poll/add"> */ }
        <button className="btn btn-default" onClick={newClick}>
          New Poll
        </button>
      { /* </Link> */ }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Toolbar);
