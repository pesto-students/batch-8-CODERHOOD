import * as express from 'express';
import {
  getMessage,
  createMessage,
  getAllMessages,
  deleteMessage,
  updateMessage,
} from './MessageController';

const messageRouter = express.Router();

messageRouter.post('/all', getAllMessages);
messageRouter.get('/:id', getMessage);
messageRouter.post('/', createMessage);
messageRouter.delete('/:id', deleteMessage);
messageRouter.put('/', updateMessage);

export default messageRouter;
