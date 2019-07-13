import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { USER_SCHEMA, SALT_WORK_FACTOR } from '../../Constants/constants';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  bio: String,
});

userSchema.pre('save', function addHashToPassword(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
  } catch (error) {
    return next(error);
  }

  return next();
});

userSchema.methods.validPassword = function validPassword(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const userModel = model(USER_SCHEMA, userSchema);

export default userModel;
