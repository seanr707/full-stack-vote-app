import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { thunkActions } from '../actions';

const noRepeats = str => {
  const arr = str.split(/,\s?/g);
  return arr
    .map((n, i, a) => a.filter(m => m.toLowerCase() === n.toLowerCase()))
    .filter(a => a.length > 1).length > 0;
};

const SubmitPost = ({ user, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  let title;
  let desc;
  let options;
  let authRequired;

  const submit = e => {
    e.preventDefault();

    if (!title.value.trim() || !desc.value.trim() || !options.value.trim()) {
      return;
    } else if (noRepeats(options.value)) {
      alert('You cannot have the same name for two entries');
    } else {
      thunkBind.postPoll({
        title: title.value,
        desc: desc.value,
        author: {
          id: user._id,
          name: user.name
        },
        // votes property added on server
        options: options.value.split(/,\s?/g).map(option => {
          return {
            title: option[0].toUpperCase() + option.substr(1)
          };
        }),
        authRequired: authRequired.checked
      });

      title.value = '';
      desc.value = '';
      options.value = '';
      authRequired.checked = false;

      browserHistory.push('/');
    }
  };

  return (
    <div className="container">
      <div className="page-main">
        <div className="poll-head">
          Add a Poll
        </div>
        <form className="poll-info" onSubmit={submit}>
          <div className="labeled-input row">
            <label className="col-4">
              Title:
            </label>
            <div className="input-container col-7">
              <input ref={node => { title = node; }} className="poll-submit-input" placeholder="Favorite color?" />
            </div>
          </div>
          <div className="labeled-input row">
            <label className="col-4">
              { window.screen.availWidth < 500 ? 'Desc:' : 'Description:' }
            </label>
            <div className="input-container col-7">
              <textarea ref={node => { desc = node; }} className="poll-submit-input" placeholder="Use markdown to describe your poll." />
            </div>
          </div>
          <div className="labeled-input row">
            <label className="col-4">
              Options:
            </label>
            <div className="input-container col-7">
              <input ref={node => { options = node; }} title="Separate by comma" className="poll-submit-input" placeholder="Red, blue, green, yellow" />
            </div>
          </div>
          <div className="labeled-input row">
            <label htmlFor="checkbox" className="col-4 center" title="One vote per logged in user">
              Require Login:
            </label>
            <input id="checkbox" ref={node => { authRequired = node; }} type="checkbox" className="poll-submit-checkbox col-1" />
          </div>
          <div className="center">
            <button className="btn btn-default" type="submit">Add Poll</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(SubmitPost);
