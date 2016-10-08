import React from 'react';
import { connect } from 'react-redux';

import { Navbar } from './index';

const App = ({ polls, user, dispatch, children }) => {
  return (
    <div id="root">
      <Navbar />
      {children}
    </div>
  );
};

export default connect()(App);
