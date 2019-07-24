import { Schema, model } from "mongoose";
import { INVITATION_SCHEMA } from "../../Constants/constants";

const invitationSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  workspace: String,
  type: String,
  user: String,
}, {
  timestamps: true
});

const invitationModel = model(INVITATION_SCHEMA, invitationSchema);

export default invitationModel;
