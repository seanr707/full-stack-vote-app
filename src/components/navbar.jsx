import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions/index.jsx';

const Navbar = ({ user }) => {
  let userInfo;

  if (user) {
    userInfo = (
      <div hidden={!user}>
        <p>Hi {user.name} [{user.screenName}]</p>
      </div>
    );
  } else {
    userInfo = (
      <a hidden={user} href="/auth/twitter" >
        <div>Login</div>
      </a>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="left nav-item">
          <Link to="/">Vote App</Link>
        </div>
        <div className="right">
          <div className="nav-item">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-item">
            {userInfo}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Navbar);
