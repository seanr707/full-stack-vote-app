import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import marked from 'marked';

import { thunkActions } from '../actions';

const markupPoll = desc => {
  return { __html: marked(desc, { sanitize: true }) };
};

const Comment = ({ comment }) => {
  if (!comment) return null;

  const date = new Date(comment.dateAdded);

  return (
    <div className="comment-container">
      <p className="comment-body" dangerouslySetInnerHTML={markupPoll(comment.text)} />
      <div className="comment-foot">
        <span id="comment-author" className="comment-foot-item">{comment.author.name}</span>
        <span id="comment-date" className="comment-foot-item right">{date.toLocaleString()}</span>
      </div>
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
      <form onSubmit={postComment} className="input-container-comments">
        <div id="comment-input" className="comment-input-container">
          <textarea
            className="poll-submit-input"
            ref={node => { commentText = node; }}
            placeholder="Comment..."
            required
          />
        </div>
        <div className="comment-input-container">
          <button type="submit" id="comment-submit" className="btn btn-submit">Submit</button>
        </div>
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
