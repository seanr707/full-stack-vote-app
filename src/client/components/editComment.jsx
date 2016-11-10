import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import marked from 'marked';

import { thunkActions } from '../actions';
import { Loading } from './index';

const markupPoll = desc => {
  return { __html: marked(desc, { sanitize: true }) };
};

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      previewText: ''
    };
  }

  render() {
    const { polls, user, params, dispatch } = this.props;
    if (!polls) return <Loading />;

    let comment;

    try {
      comment = polls
      .find(poll => poll._id === params.pollId).comments
      .find(comment => comment._id === params.commentId);
    } catch (err) {
      console.error(err);
      setTimeout(browserHistory.goBack, 1000);
      return <div className="container">Error: Going back...</div>;
    }

    if (!user || user._id !== comment.author.id) {
      return <div className="container">You are not the author</div>;
    }

    const thunkBind = bindActionCreators(thunkActions, dispatch);

    // To allow for intitial preview of Markdown
    let commentText = { value: comment.text };

    const submitComment = e => {
      e.preventDefault();

      thunkBind.updateComment(params.pollId, params.commentId, Object.assign({}, comment, {
        text: commentText.value
      }));

      commentText.value = '';
      browserHistory.goBack();
    };

    return (
      <div className="container">
        <div className="page-main">
          <div className="poll-head">
            Edit Your Comment
          </div>
          <div className="poll-info">
            <form onSubmit={submitComment} className="input-container-comments">
              <div id="comment-input" className="comment-input-container">
                <textarea
                  className="poll-submit-input"
                  ref={node => { commentText = node; }}
                  defaultValue={comment.text}
                  onChange={e => this.setState({ previewText: e.target.value })}
                  required
                />
              </div>
              <div className="comment-input-container">
                <button type="submit" id="comment-submit" className="btn btn-submit">Submit</button>
              </div>
            </form>
            { /* Only show preview when the user begins typing */
              this.state.previewText
              ? (
                <div>
                  <h3>
                    Preview Text
                  </h3>
                  <div id="preview">
                    <p dangerouslySetInnerHTML={markupPoll(this.state.previewText)} />
                  </div>
                </div>
              )
              : null
            }
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    polls: state.reducer.get('polls'),
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(EditComment);
