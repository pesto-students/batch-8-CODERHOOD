import { Schema, model } from 'mongoose';
import { WORKSPACE_SCHEMA } from '../../Constants/constants';

const workspaceSchema = new Schema({
  name: String,
  user: String,
  members: [String],
});

const workspaceModel = model(WORKSPACE_SCHEMA, workspaceSchema);

export default workspaceModel;
