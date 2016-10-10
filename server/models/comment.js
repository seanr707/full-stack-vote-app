import mongoose from 'mongoose';

export default mongoose.Schema({
  text: String,
  author: {
    id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  votes: {
    up: Number,
    down: Number
  },
  dateAdded: Number
});
