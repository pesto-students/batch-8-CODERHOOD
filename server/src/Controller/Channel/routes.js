import * as express from 'express';
import {
  getChannel,
  createChannel,
  getAllChannels,
  deleteChannel,
  updateChannel,
} from './ChannelController';

const channelRouter = express.Router();

channelRouter.get('/', getAllChannels);
channelRouter.get('/:id', getChannel);
channelRouter.post('/', createChannel);
channelRouter.delete('/:id', deleteChannel);
channelRouter.put('/', updateChannel);

export default channelRouter;
