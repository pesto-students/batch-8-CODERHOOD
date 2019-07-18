import { Schema, model } from 'mongoose';
import { MESSAGE_SCHEMA } from '../../Constants/constants';

const messageSchema = new Schema(
  {
    from: String,
    to: String,
    fromUser: String,
    message: String,
    workspace: String,
    channel: String,
    isComment: Boolean,
  },
  {
    timestamps: {
      createdAt: 'created_At',
      updatedAt: 'updated_At',
    },
  },
);

const messageModel = model(MESSAGE_SCHEMA, messageSchema);

export default messageModel;
