import mongoose from 'mongoose';

export default mongoose.Schema({
  twitterId: String,
  name: String,
  screenName: String,
  profileImageUrl: String,
  location: String,
  url: String,
  polls: Array
});
