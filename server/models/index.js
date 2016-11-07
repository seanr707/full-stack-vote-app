import mongoose from 'mongoose';

import userSchema from './user';
import pollOptionSchema from './pollOption';
import commentSchema from './comment';

const pollSchema = mongoose.Schema({
  title: String,
  desc: String,
  author: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: String
  },
  authRequired: Boolean,
  dateAdded: Number,
  dateUpdated: Number,
  options: [pollOptionSchema],
  comments: [commentSchema]
});

export default () => {
  return {
    Poll: mongoose.model('Poll', pollSchema),
    PollOption: mongoose.model('PollOption', pollOptionSchema),
    User: mongoose.model('User', userSchema)
  };
};

/*
export const Poll = mongoose.model('Poll', pollSchema);
export const PollOption = mongoose.model('PollOption', pollOptionSchema);
export const User = mongoose.model('User', userSchema);
*/
