import {
  messageEvent,
  connectionConfirmationEvent,
  subscribeToChannelsEvent,
  unsubscribeToChannelsEvent,
  typingIndicationEvent,
  clearTypingIndicationEvent,
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
     * @param messageObj.isConversation Flag(bool) to check if it is a one-to-one chat.
     */
    socket.on(messageEvent, (messageObj) => {
      const messageId = generateObjectID();
      const { isConversation, ...cleanedMessageObj } = messageObj;
      const cleanedMessageObjWithId = {
        ...cleanedMessageObj,
        _id: messageId,
      };
      namespace.emit(messageEvent, { isConversation, ...cleanedMessageObjWithId });
      create(messageModel, cleanedMessageObjWithId);
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

    let typingIndicationTimeout = null;
    socket.on(typingIndicationEvent, (dataObject) => {
      if (typingIndicationTimeout) {
        clearTimeout(typingIndicationTimeout);
      }
      socket.broadcast.emit(typingIndicationEvent, dataObject);
      typingIndicationTimeout = setTimeout(() => {
        namespace.emit(clearTypingIndicationEvent);
      }, 3000);
    });
  });
};

export { createWorkspaceNamespace, configureEventHandlersForWorkspace };
