import * as express from 'express';
import {
  getChannel,
  createChannel,
  getAllChannels,
  deleteChannel,
  updateChannel,
  updateChannelMembers,
} from './ChannelController';

const channelRouter = express.Router();

channelRouter.post('/all', getAllChannels);
channelRouter.get('/:id', getChannel);
channelRouter.post('/', createChannel);
channelRouter.delete('/:id', deleteChannel);
channelRouter.put('/', updateChannel);
channelRouter.put('/member', updateChannelMembers);

export default channelRouter;
