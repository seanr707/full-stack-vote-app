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
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        },
        {
          title: Math.floor(Math.random() * 100).toString(),
          votes: 0
        }
      ]
    });
  };

  return (
    <div className="toolbar">
      <div className="toolbar-container">
        <div className="toolbar-item" onClick={getClick}>
          ↻
        </div>
        {user
          ? <Link to="/page/submit">
            <div className="toolbar-item">
              +
            </div>
          </Link>
          : null
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Toolbar);
