import {
  create,
  findMany,
} from "../../Repositories/genericRepository";
import successHandler from "../../libs/routes/successHandler";
import { channelResponse } from "../../Constants/constants";
import { invitationModel } from "../../Model";
import { sendWorkspaceInvite } from "../../libs/emails/email";
// import { first } from 'lodash-es';

const getAllInvitations = async (req, res, next) => {
  try {
    const data = req.body;
    const { foundAllInvitations } = channelResponse;
    const result = await findMany(invitationModel, data);
    res.status(200).send(successHandler(foundAllInvitations, result));
  } catch (error) {
    next(error);
  }
};

const createInvitation = async (req, res, next) => {
  try {
    const { name, email, user, type, workspace } = req.body;
    const data = {
      name,
      email,
      workspace,
      type,
      user,
    };
    const result = await create(invitationModel, data);
    const { channelCreated } = channelResponse;
    const emailResult = await sendWorkspaceInvite(data);
    console.log({result, emailResult, body: req.body});

    res.status(201).send(successHandler(channelCreated, result));
  } catch (error) {
    next(error);
  }
};

export {
  createInvitation,
  getAllInvitations,
};
