import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import marked from 'marked';

import { thunkActions } from '../actions';

const markupPoll = desc => {
  return { __html: marked(desc, { sanitize: true }) };
};

const Comment = ({ comment, link, commentActions, owner }) => {
  if (!comment) return null;

  const date = new Date(comment.dateAdded);

  const ownerButtons = (
    <div className="btn-container">
      <Link to={link}>
        <button type="button" className="btn btn-default">Edit</button>
      </Link>
      <button type="button" className="btn btn-default" onClick={commentActions.removeComment}>Delete</button>
    </div>
  );

  return (
    <div className="comment-container">
      <p className="comment-body" dangerouslySetInnerHTML={markupPoll(comment.text)} />
      {owner ? ownerButtons : null}
      <div className="comment-foot">
        <span id="comment-author" className="comment-foot-item">{comment.author.name} (@{comment.author.username})</span>
        <span id="comment-date" className="comment-foot-item right">{date.toLocaleString()}</span>
      </div>
    </div>
  );
};

const Comments = ({ pollId, comments, user, params, dispatch }) => {
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
      votes: {
        up: 0,
        down: 0
      },
      text: commentText.value,
      dateAdded: Date.now()
    });

    // Clear out textarea
    commentText.value = '';
  };

  const commentActions = (pollId, commentId) => {
    return {
      removeComment: () => thunkBind.deleteComment(pollId, commentId),
      updateComment: (text) => thunkBind.updateComment(pollId, commentId, text)
    };
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
              owner={user._id === comment.author.id}
              commentActions={commentActions(pollId, comment._id)}
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
        : <div className="container center">Login to comment</div>
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
