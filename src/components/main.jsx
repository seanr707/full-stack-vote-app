import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Navbar } from './index';

import { thunkActions } from '../actions/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.thunkBind = bindActionCreators(thunkActions, this.props.dispatch);
  }

  static propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      children: PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    this.thunkBind.getAllPolls();
    this.thunkBind.verifyUser();
  }

  render() {
    // ({ polls, user, children } = this.props);
    return (
      <div id="root">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
};

export default connect()(App);
