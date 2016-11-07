import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { thunkActions } from '../actions';

const User = ({ userView, dispatch, params, children }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);
  thunkBind.getUserView(params.userId);
  // If this loads initially, then we need to wait for Promise Thunk to return
  if (!userView) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="page-main row">
        <div className="poll-head">{userView.user.name}</div>
        <div className="poll-info">
          <div className="user-image">
            <img alt="user-image" src={userView.user.profileImageUrl} />
          </div>
          <div className="user-info">
            <h2>{userView.user.name}</h2>
            <h4>{userView.user.screenName}</h4>
            <h4>{userView.user.location}</h4>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    Poll
                  </th>
                  <th>
                    Top Option
                  </th>
                  <th>
                    Votes
                  </th>
                  <th>
                    Total Votes
                  </th>
                </tr>
              </thead>
              <tbody>
                { userView.polls.reverse().map((poll, i) => {
                  const topOption = poll.options.sort((a, b) => a.votes > b.votes).reverse()[0];
                  return (
                    <tr key={i}>
                      <td>
                        <Link to={`/page/poll/${poll._id}`}>
                          { poll.title.length < 20 ? poll.title : poll.title.substr(0, 20) + '...' }
                        </Link>
                      </td>
                      <td>
                        { (topOption.title.length < 20 ? topOption.title : topOption.title.substr(0, 10) + '...') }
                      </td>
                      <td>
                        { topOption.votes }
                      </td>
                      <td>
                        { poll.options.reduce((curr, next) => curr + next.votes, 0) }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="poll-foot">
          <div style={{display: 'inline-block'}}>
            {userView.user.pollsCreated.length}
          </div>
          <div style={{float: 'right'}}>
            {userView.user.pollsVoted.length}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userView: state.reducer.get('userView')
  };
};

export default connect(mapStateToProps)(User);
