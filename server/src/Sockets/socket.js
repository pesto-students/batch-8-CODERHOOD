import {
  messageEvent,
  connectionConfirmationEvent,
  subscribeToChannelsEvent,
  unsubscribeToChannelsEvent,
} from './events';

import { io } from '../index';
import { messageModel } from '../Model';
import { create } from '../Repositories/genericRepository';

const createWorkspaceNamespace = namespace => io.of(`/${namespace}`);

const configureEventHandlersForWorkspace = (namespace) => {
  namespace.on('connection', (socket) => {
    console.log('User Connected');
    socket.emit(connectionConfirmationEvent);

    /**
    * @param msgObj Object containing msg relevant data.
    * @param msgObj.channel ID of the channels the msg is coming from.
    * @param msgObj.msg Content of the message.
    * @param msgObj.userId Id of the user sending the message.
    * @param msgObj.workspace Id of the workspace message is sent from.
    * @param msgObj.user Name of the user sending the message.
    * @param msgObj.timestamp Time when the message was sent.
    */
    socket.on(messageEvent, (msgObj) => {
      // console.log(msgObj);
      // console.log('message sent by user');
      // socket.broadcast.emit(messageEvent, msgObj);
      const { message } = msgObj.msg;
      const from = msgObj.userId;
      const user = msgObj.user;
      const to = msgObj.channel;
      const { workspace } = msgObj;
      const createdAt = msgObj.timestamp;

      const newMessage = {
        from,
        to,
        user,
        message,
        workspace,
        channel: to,
        isComment: false,
        createdAt,
      };

      namespace.emit(messageEvent, msgObj);
      create(messageModel, newMessage);
    });

    /**
     * @param channels Array of channel/s
     */
    socket.on(subscribeToChannelsEvent, ({ channels }) => {
      for (let i = 0; i < channels.length; i += 1) {
        socket.join(channels[i]);
      }
    });

    /**
     * @param channels Array of channel/s
     */
    socket.on(unsubscribeToChannelsEvent, ({ channels }) => {
      for (let i = 0; i < channels.length; i += 1) {
        socket.leave(channels[i]);
      }
    });
  });
};

export {
  createWorkspaceNamespace,
  configureEventHandlersForWorkspace,
};
