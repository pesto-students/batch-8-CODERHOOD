import * as express from 'express';
import {
  createInvitation,
  getAllInvitations,
  approveInvitations,
} from './InvitationController';

const invitationRouter = express.Router();

invitationRouter.post('/all', getAllInvitations);
invitationRouter.post('/', createInvitation);
invitationRouter.get('/approve/:userId', approveInvitations);

export default invitationRouter;
