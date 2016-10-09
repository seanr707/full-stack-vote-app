import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../actions/index.jsx';

const Navbar = ({ user, dispatch }) => {
  const actionBind = bindActionCreators(actions, dispatch);

  let userInfo;

  if (user) {
    userInfo = (
      <div>
        <div title={user.screenName} onClick={actionBind.logout}>
          {user.name} [Sign Out]
        </div>
      </div>
    );
  } else {
    userInfo = (
      <a href="/auth/twitter">
        <div>Login</div>
      </a>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="left nav-item nav-title">
          <Link to="/">Vote App</Link>
        </div>
        <div className="right">
          <div className="nav-item nav-option">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-item nav-option">
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
