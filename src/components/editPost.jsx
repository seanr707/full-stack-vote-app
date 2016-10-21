import React, { PropTypes } from 'react';
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

const addInput = e => {
  e.target.parentElement.append(
    <h1>It worked!</h1>
  );
};

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { polls, params } = props;
    this.state = {
      ready: false,
      pollOptions: []
    };
    setTimeout(() => {
      const poll = this.props.polls.find(poll => poll._id === params.pollId);
      this.setState({
        ready: true,
        pollOptions: poll.options
      });
    }, 1000);
  }

  static propTypes() {
    return {
      polls: PropTypes.Array.isRequired,
      user: PropTypes.Object,
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.Object.isRequired
    };
  }

  updatePollOptions(options) {
    this.setState({ pollOptions: options });
  }

  render() {
    const { polls, user, dispatch, params } = this.props;

    if (!this.state.ready) return <div className="container">Loading</div>;

    const thunkBind = bindActionCreators(thunkActions, dispatch);

    const poll = polls.find(poll => poll._id === params.pollId);

    let title;
    let desc;
    let options = [];
    let authRequired;

    const submit = e => {
      e.preventDefault();

      if (!title.value.trim() || !desc.value.trim()) {
        return;
      } else {
        const optionsExtract = options.map(option => {
          const pollEqual = poll.options.find(item => item._id === option.dataset.id);

          if (pollEqual) {
            return Object.assign({}, pollEqual, {
              title: option.value[0].toUpperCase() + option.value.substr(1)
            });
          } else {
            return {
              title: option.value[0].toUpperCase() + option.value.substr(1)
            };
          }
        });

        thunkBind.editPoll(poll._id, {
          update: {
            title: title.value,
            desc: desc.value,
            author: {
              id: user._id,
              name: user.name
            },
            // votes property added on server
            options: optionsExtract,
            authRequired: authRequired.checked
          }
        });

        title.value = '';
        desc.value = '';
        options.value = '';
        authRequired.checked = false;

        browserHistory.goBack();
      }
    };

    const removeOption = e => {
      console.log(e.target.dataset.index);
      this.setState({
        pollOptions: this.state.pollOptions.filter((option, i) => {
          console.log(parseInt(e.target.getAttribute('data-index')) !== i);
          console.log(i);
          return parseInt(e.target.dataset.index) !== i;
        })
      });
    };

    return (
      <div className="container">
        <div className="page-main">
          <div className="poll-head">
            Edit "{poll.title}" Info
          </div>
          <form className="poll-info" onSubmit={submit}>
            <div className="labeled-input row">
              <label className="col-4">
                Title:
              </label>
              <input ref={node => { title = node; }} className="poll-submit-input col-6" defaultValue={poll.title} />
            </div>
            <div className="labeled-input row">
              <label className="col-4">
                { window.screen.availWidth < 500 ? 'Desc:' : 'Description:' }
              </label>
              <textarea ref={node => { desc = node; }} className="poll-submit-input col-6" defaultValue={poll.desc} />
            </div>
            <div className="labeled-input row">
              <label className="col-4">
                Options:
              </label>
              <div className="col-6">
                {this.state.pollOptions.map((option, i) => {
                  console.log(options);
                  return (
                    <div key={i}>
                      <input
                        ref={node =>  options.push(node)}
                        data-id={option._id}
                        className="poll-submit-input"
                        value={option.title}
                        onChange={e => {
                          const temp = Object.assign({}, option, {
                            title: e.target.value
                          });
                          this.updatePollOptions(this.state.pollOptions.map(option2 => {
                            if (option._id === option2._id) return temp;
                            return option2;
                          }));
                        }}
                      />
                      <button
                        type="button"
                        className="option-delete"
                        data-index={i}
                        onClick={removeOption}
                      >
                        x
                      </button>
                    </div>
                  );
                })}
                <button type="button" onClick={() => {
                  this.setState({
                    pollOptions: this.state.pollOptions.concat({
                      title: ''
                    })
                  });
                }}>
                  +
                </button>
              </div>
            </div>
            <div className="labeled-input row">
              <label htmlFor="checkbox" className="col-4 center" title="One vote per logged in user">
                Require Login:
              </label>
              <input
                id="checkbox"
                ref={node => { authRequired = node; }}
                type="checkbox"
                defaultChecked={poll.authRequired}
                className="poll-submit-checkbox col-1"
              />
            </div>
            <div className="center">
              <button className="btn btn-default" type="submit">Update Poll</button>
            </div>
          </form>
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

export default connect(mapStateToProps)(EditPost);
