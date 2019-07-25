import { create, findMany, findOne } from '../../Repositories/genericRepository';
import successHandler from '../../libs/routes/successHandler';
import { invitationResponse } from '../../Constants/constants';
import { invitationModel, userModel } from '../../Model';
import { acceptAllWorkspaceInvites } from './utils';
import { sendWorkspaceInvite } from '../../libs/emails/email';

const getAllInvitations = async (req, res, next) => {
  try {
    const data = req.body;
    const { foundAllInvitations } = invitationResponse;
    const result = await findMany(invitationModel, data);
    res.status(200).send(successHandler(foundAllInvitations, result));
  } catch (error) {
    next(error);
  }
};

const createInvitation = async (req, res, next) => {
  try {
    const {
      name, email, user, type, workspace,
    } = req.body;
    const data = {
      name,
      email,
      workspace,
      type,
      user,
    };
    const result = await create(invitationModel, data);
    const { invitationCreated } = invitationResponse;
    await sendWorkspaceInvite(data);
    const invitedUser = await findOne(userModel, { email });
    if (invitedUser !== undefined) {
      const { _id } = invitedUser;
      await acceptAllWorkspaceInvites(_id, email);
    }
    res.status(201).send(successHandler(invitationCreated, result));
  } catch (error) {
    next(error);
  }
};

const approveInvitations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const invitedUser = await findOne(userModel, { _id: userId });
    const { invitationAccepted } = invitationResponse;

    if (Object.keys(invitedUser).length) {
      await acceptAllWorkspaceInvites(userId, invitedUser.email);
      res.status(200).send(successHandler(invitationAccepted, []));
    } else {
      const errMessage = 'No invited user found';
      const error = new Error(errMessage);
      res.status(200).send(successHandler(errMessage, error));
    }
  } catch (error) {
    next(error);
  }
};

export { createInvitation, getAllInvitations, approveInvitations };
