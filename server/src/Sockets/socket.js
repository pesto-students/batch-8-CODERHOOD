import {
  messageEvent,
  connectionConfirmationEvent,
  subscribeToChannelsEvent,
  unsubscribeToChannelsEvent,
} from './events';

import { generateObjectID, create } from '../Repositories/genericRepository';
import { messageModel } from '../Model';
import { io } from '../index';

const createWorkspaceNamespace = namespace => io.of(`/${namespace}`);

const configureEventHandlersForWorkspace = (namespace) => {
  namespace.on('connection', (socket) => {
    socket.emit(connectionConfirmationEvent);

    /**
     * @param messageObj Object containing msg relevant data.
     * @param messageObj.channel ID of the channels the msg is coming from.
     * @param messageObj.message Content of the message.
     * @param messageObj.from Id of the user sending the message.
     * @param messageObj.to Id of channel/user the message is being sent to.
     * @param messageObj.workspace Id of the workspace message is sent from.
     * @param messageObj.fromUser Name of the user sending the message.
     */
    socket.on(messageEvent, (messageObj) => {
      const messageId = generateObjectID();
      const messageWithId = {
        ...messageObj,
        _id: messageId,
      };
      namespace.emit(messageEvent, messageWithId);
      create(messageModel, messageWithId);
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

export { createWorkspaceNamespace, configureEventHandlersForWorkspace };
