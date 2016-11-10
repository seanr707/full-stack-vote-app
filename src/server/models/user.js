import mongoose from 'mongoose';

export default mongoose.Schema({
  twitterId: String,
  name: String,
  screenName: String,
  profileImageUrl: String,
  location: String,
  url: String,
  pollsCreated: [mongoose.Schema.Types.ObjectId],
  pollsVoted: [{
    pollId: mongoose.Schema.Types.ObjectId,
    optionId: mongoose.Schema.Types.ObjectId
  }]
});
