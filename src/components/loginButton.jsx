import React from 'react';

export default props => {
  return (
    <a href="/auth/twitter">
      <button type="button" className="btn btn-login">
        <div className="login-btn-container">
          <img className="login-btn-img" src="/public/img/twitter-logo-white.png" />
          <span className="login-btn-text">Login</span>
        </div>
      </button>
    </a>
  );
};
