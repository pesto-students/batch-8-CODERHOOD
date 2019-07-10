import { Schema, model } from 'mongoose';
import { USER_SCHEMA } from '../../Constants/constants';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  bio: String,
});

const userModel = model(USER_SCHEMA, userSchema);

export default userModel;
