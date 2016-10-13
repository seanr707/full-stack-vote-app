import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
        // This needs to be changed for production: NEEDS TO SET DEFAULT VOTE ON SERVER SIDE
        options: options.value.split(/,\s?/g).map(option => {
          return {
            title: option[0].toUpperCase() + option.substr(1),
            votes: 0
          };
        })
      });

      title.value = '';
      desc.value = '';
      options.value = '';
    }
  };

  return (
    <div className="container">
      <form onSubmit={submit}>
        <div>
          <label>Title</label>
          <input ref={node => { title = node; }} placeholder="Favorite color?" />
        </div>
        <div>
          <label>Description</label>
          <input ref={node => { desc = node; }} placeholder="Pick a color that you really love." />
        </div>
        <div>
          <label>Options</label>
          <input ref={node => { options = node; }} title="Separate by comma" placeholder="Red, blue, green, yellow" />
        </div>
        <button className="btn btn-default" type="submit">Add Poll</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(SubmitPost);
