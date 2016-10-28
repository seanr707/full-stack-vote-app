import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';

import { actions, thunkActions } from '../actions';

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      ready: false
    };
    this.poll;
  }

  static propTypes() {
    return {
      polls: PropTypes.Array.isRequired,
      storedInput: PropTypes.Array,
      user: PropTypes.Object,
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.Object.isRequired
    };
  }

  componentWillMount() {
    axios.get(`/poll/id/${this.props.params.pollId}`).then(
      res => {
        const actionBind = bindActionCreators(actions, this.props.dispatch);

        this.poll = res.data;

        actionBind.storeOptionInput(this.poll.options);

        this.setState({
          ready: true
        });
      }
    );
  }

  render() {
    const { storedInput, user, dispatch } = this.props;

    // Placeholder
    if (!this.state.ready) return <div className="container">Loading...</div>;

    // Placeholder
    if (!user || user._id !== this.poll.author.id) {
      return <div className="container">You are not the author.</div>;
    }

    const actionBind = bindActionCreators(actions, dispatch);
    const thunkBind = bindActionCreators(thunkActions, dispatch);

    const poll = this.poll;

    // Set up storage for input nodes
    let title;
    let desc;
    let options = [];
    let authRequired;

    // Our submit function for our form
    const submit = e => {
      e.preventDefault();

      // Extract values from DOM nodes and only return populated strings
      const optionsExtract = options.map(option => {
        if (!option.value.trim()) return false;
        const pollEqual = poll.options.find(item => item._id === option.dataset.id);

        // If the option exists, keep it's old values; otherwise don't worry about it
        if (pollEqual) {
          return Object.assign({}, pollEqual, {
            title: option.value[0].toUpperCase() + option.value.substr(1)
          });
        } else {
          return {
            title: option.value[0].toUpperCase() + option.value.substr(1)
          };
        }
        // Filters for values that have letters, numbers, or at least two symbols (i.e. ";)")
      }).filter(str => str.title.match(/\w|\d|\W{2}/g));

      thunkBind.editPoll(poll._id, {
        update: {
          title: title.value,
          desc: desc.value,
          // votes property added on server
          options: optionsExtract,
          authRequired: authRequired.checked
        }
      });

      browserHistory.goBack();
      thunkBind.getAllPolls();
    };

    const removeInput = e => {
      actionBind.storeOptionInput(storedInput.filter((option, i) => {
        return parseInt(e.target.dataset.index) !== i;
      }));
    };

    const addInput = e => actionBind.storeOptionInput(storedInput.concat(''));

    const updateOptionInput = index => {
      return e => {
        actionBind.storeOptionInput(storedInput.map((option, i) => {
          if (index === i) {
            return Object.assign({}, option, {
              title: e.target.value
            });
          }
          return option;
        }));
      };
    };

    return (
      <div className="container">
        <div className="page-main">
          <div className="poll-head">
            Edit "{poll.title}" Info
          </div>
          <form className="poll-info" onSubmit={submit}>
            <div id="input-title" className="labeled-input row">
              <label className="col-4">
                Title:
              </label>
              <input ref={node => { title = node; }} className="poll-submit-input col-6" defaultValue={poll.title} required />
            </div>
            <div id="input-desc" className="labeled-input row">
              <label className="col-4">
                { window.screen.availWidth < 500 ? 'Desc:' : 'Description:' }
              </label>
              <textarea ref={node => { desc = node; }} className="poll-submit-input col-6" defaultValue={poll.desc} />
            </div>
            <div id="input-options" className="labeled-input row">
              <label className="col-4">
                Options:
              </label>
              <div className="col-6 input-container">
                {storedInput.map((option, i) => {
                  return (
                    <div key={i}>
                      <input
                        ref={node => options.push(node)}
                        data-id={option._id}
                        className="poll-submit-input option-input"
                        value={option.title}
                        onChange={updateOptionInput(i)}
                        required
                      />
                      <button type="button" className="clickable-clear" data-index={i} onClick={removeInput}>
                        x
                      </button>
                    </div>
                  );
                })}
                <div id="input-add">
                  <button type="button" className="btn-round btn-round-add" onClick={addInput}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <div id="input-auth" className="labeled-input row">
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
            <div id="input-submit" className="center">
              <button className="btn btn-default" type="submit">Update</button>
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
    storedInput: state.reducer.get('storedInput'),
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(EditPost);
