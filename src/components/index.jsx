import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions/index.jsx';
import Polls from './polls.jsx';

const Test = ({ polls, user, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const getClick = () => {
    thunkBind.getAllPolls();
  };

  const newClick = () => {
    thunkBind.postPoll({
      title: 'New poll',
      desc: 'Uses thunk',
      author: {
        _id: user._id,
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

  let userInfo;

  if (user) {
    userInfo = (
      <div hidden={!user}>
        <p>Hi {user.name} [{user.screenName}]</p>
      </div>
    );
  } else {
    userInfo = <a hidden={user} href="/auth/twitter" ><button>Login</button></a>;
  }

  return (
    <div id="home-container">
      {userInfo}
      <button onClick={thunkBind.verifyUser}>Check Login</button>
      <button onClick={getClick}>Update polls</button>
      <button onClick={newClick} disabled={!user}>Add new fake poll</button>
      <Polls polls={polls} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.get('user')
  };
};

export default connect(mapStateToProps)(Test);
