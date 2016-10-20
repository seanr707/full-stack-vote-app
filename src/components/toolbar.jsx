import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions';

const Toolbar = ({ currentRoute, user, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const backClick = () => {
    if (currentRoute === '/') return null;

    return browserHistory.goBack();
  };

  const getClick = () => {
    thunkBind.getAllPolls();
  };

  return (
    <div className="toolbar">
      <div className="toolbar-container row">
        <div className="toolbar-item col-4" onClick={backClick}>
          ◀
        </div>
        <div className="toolbar-item col-4" onClick={getClick}>
          ↻
        </div>
        {user
          ? <div className="toolbar-item col-4">
            <Link to="/page/submit">
              +
            </Link>
          </div>
          : null
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user'),
    currentRoute: state.routing.locationBeforeTransitions.pathname
  };
};

export default connect(mapStateToProps)(Toolbar);
