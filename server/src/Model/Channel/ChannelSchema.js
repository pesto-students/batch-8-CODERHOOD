import { Schema, model } from 'mongoose';
import { CHANNEL_SCHEMA } from '../../Constants/constants';

const channelSchema = new Schema({
  name: String,
  workspace: String,
  user: String,
  isPrivate: Boolean,
  members: [String],
});

const channelModel = model(CHANNEL_SCHEMA, channelSchema);

export default channelModel;
