import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { thunkActions } from '../actions/index.jsx';

const Comment = ({ comment }) => {
  if (!comment) return null;

  const date = new Date(comment.dateAdded);

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <p>{date.toLocaleString()}</p>
      <p>By: {comment.author.name}</p>
    </div>
  );
};

const Comments = ({ pollId, comments, user, dispatch }) => {
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const postComment = event => {
    // Prevents page from reloading after submit
    event.preventDefault();
    // Sends comment to API
    thunkBind.addComment(pollId, {
      author: {
        id: user._id,
        name: user.name
      },
      votes: {
        up: 0,
        down: 0
      },
      text: commentText.value,
      dateAdded: Date.now()
    });
  };

  let commentText;

  return (
    <div className="comments">
      {comments
        ? comments.map((comment, i) => <Comment comment={comment} key={i} />)
        : null
      }
      <form onSubmit={postComment}>
        <input ref={node => { commentText = node; }}placeholder="Comment..." />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Comments);
