import React from 'react';
import { Link } from 'react-router';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { actions } from '../actions';

const Navbar = ({ user, dispatch }) => {
  // Will be used once logout is implemented
  // const actionBind = bindActionCreators(actions, dispatch);

  let userInfo;

  if (user) {
    userInfo = (
      <div>
        <Link to={`/page/user/${user._id}`}>
          <div title={user.screenName}>
            {user.name}
          </div>
        </Link>
      </div>
    );
  } else {
    userInfo = (
      <a href="/auth/twitter">
        <div className="login-btn-container">
          <img className="login-btn-img" src="/public/img/twitter-logo-white.png" />
          <span>Login</span>
        </div>
      </a>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="left nav-item nav-title">
          <Link to="/">{ process.env.TITLE || 'Vote App' }</Link>
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
