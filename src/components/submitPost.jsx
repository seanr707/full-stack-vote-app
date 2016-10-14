import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { thunkActions } from '../actions/index.jsx';

const SubmitPost = ({ user, dispatch, params }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  let title;
  let desc;
  let options;

  const submit = e => {
    e.preventDefault();

    if (!title.value.trim() || !desc.value.trim() || !options.value.trim()) {
      return;
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
        })
      });

      title.value = '';
      desc.value = '';
      options.value = '';

      browserHistory.push('/');
    }
  };

  return (
    <div className="container">
      <div className="page-main">
        <form onSubmit={submit}>
          <div className="labeled-input row">
            <label className="col-4">Title</label>
            <input ref={node => { title = node; }} className="poll-submit-input col-5" placeholder="Favorite color?" />
          </div>
          <div className="labeled-input row">
            <label className="col-4">Description</label>
            <textarea ref={node => { desc = node; }} className="poll-submit-input col-5" placeholder="Use markdown to describe your poll." />
          </div>
          <div className="labeled-input row">
            <label className="col-4">Options</label>
            <input ref={node => { options = node; }} title="Separate by comma" className="poll-submit-input col-5" placeholder="Red, blue, green, yellow" />
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
