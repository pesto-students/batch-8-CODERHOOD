import * as express from 'express';
import userRouter from './Controller/User/routes';
import channelRouter from './Controller/Channel/routes';
import workspaceRouter from './Controller/Workspace/routes';
import messageRouter from './Controller/Message/routes';
import invitationRouter from './Controller/Invitation/routes';
import {
  USER_PREFIX,
  CHANNEL_PREFIX,
  WORKSPACE_PREFIX,
  MESSAGE_PREFIX,
  INVITATION_PREFIX,
} from './Constants/constants';

const router = express.Router();

router.use(`/${USER_PREFIX}`, userRouter);
router.use(`/${CHANNEL_PREFIX}`, channelRouter);
router.use(`/${WORKSPACE_PREFIX}`, workspaceRouter);
router.use(`/${MESSAGE_PREFIX}`, messageRouter);
router.use(`/${INVITATION_PREFIX}`, invitationRouter);

export default router;
