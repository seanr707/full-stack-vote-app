import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import marked from 'marked';

import { thunkActions } from '../actions';
import { LoginButton } from './index';

const markupPoll = desc => {
  return { __html: marked(desc, { sanitize: true }) };
};

const Comment = ({ comment, link, removeComment, owner }) => {
  if (!comment) return null;

  const date = new Date(comment.dateAdded);

  const ownerButtons = (
    <div className="center">
      <div className="btn-container">
        <Link to={link}>
          <button type="button" className="btn btn-default">Edit</button>
        </Link>
        <button type="button" className="btn btn-remove" onClick={removeComment}>Delete</button>
      </div>
    </div>
  );

  return (
    <div className="comment-container">
      <p className="comment-body" dangerouslySetInnerHTML={markupPoll(comment.text)} />
      {owner ? ownerButtons : null}
      <div className="comment-foot">
        <span id="comment-author" className="comment-foot-item">
          {comment.author.name}
          <Link to={`/page/user/${comment.author.id}`}>
            <span className="user-link">(@{comment.author.username})</span>
          </Link>
        </span>
        <span id="comment-date" className="comment-foot-item right">{date.toLocaleString()}</span>
      </div>
    </div>
  );
};

const Comments = ({ pollId, comments, user, params, dispatch }) => {
  if (!comments) return <LoginButton />;

  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const postComment = event => {
    // Prevents page from reloading after submit
    event.preventDefault();
    // Sends comment to API
    thunkBind.addComment(pollId, {
      author: {
        id: user._id,
        name: user.name,
        username: user.screenName
      },
      text: commentText.value,
      dateAdded: Date.now()
    });

    // Clear out textarea
    commentText.value = '';
  };

  let commentText;

  return (
    <div className="comments">
      { /* Displays nothing if there are no comments */
        comments
        ? comments.map((comment, i) => {
          return (
            <Comment
              comment={comment}
              owner={user && user._id === comment.author.id}
              removeComment={() => thunkBind.deleteComment(pollId, comment._id)}
              link={`/page/poll/${pollId}/comments/${comment._id}/edit`}
              key={i}
            />
          );
        })
        : null
      }
      { /* Hides input if the user is not logged in */
        user
        ? (
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
        )
        : <div className="center container">
          <LoginButton /> to comment
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Comments);
