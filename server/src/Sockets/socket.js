import {
  messageEvent,
  connectionConfirmationEvent,
  subscribeToChannelsEvent,
  unsubscribeToChannelsEvent,
} from './events';

import { io } from '../index';

const createWorkspaceNamespace = namespace => io.of(`/${namespace}`);

const configureEventHandlersForWorkspace = (namespace) => {
  namespace.on('connection', (socket) => {
    console.log('User Connected');
    socket.emit(connectionConfirmationEvent);

    /**
    * @param msgObj Object containing msg relevant data.
    * @param msgObj.channel Name of the channels the msg is coming from.
    * @param msgObj.msg Content of the message.
    * @param msgObj.user Name of the user sending the message.
    * @param msgObj.timestamp Time when the message was sent.
    */
    socket.on(messageEvent, (msgObj) => {
      // console.log(msgObj);
      // console.log('message sent by user');
      // socket.broadcast.emit(messageEvent, msgObj);
      namespace.emit(messageEvent, msgObj);
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
