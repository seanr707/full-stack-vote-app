import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions';

const Toolbar = ({ currentRoute, user, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const backClick = () => browserHistory.goBack();
  const getClick = () => thunkBind.getAllPolls();

  return (
    <nav className="toolbar">
      <div className="toolbar-container row">
        <button className="toolbar-item col-4" onClick={backClick} disabled={currentRoute === '/'}>
          ◀
        </button>
        <button className="toolbar-item col-4" onClick={getClick}>
          ↻
        </button>
        {user
          ? <button className="toolbar-item col-4">
            <Link to="/page/submit">
              +
            </Link>
          </button>
          : null
        }
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user'),
    currentRoute: state.routing.locationBeforeTransitions.pathname
  };
};

export default connect(mapStateToProps)(Toolbar);
