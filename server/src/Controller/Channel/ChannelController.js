import {
  create,
  deleteDoc,
  findOne,
  findMany,
  update,
} from '../../Repositories/genericRepository';
import successHandler from '../../libs/routes/successHandler';
import { channelResponse } from '../../Constants/constants';
import { channelModel } from '../../Model';


const getChannel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { channelNotFound, channelFound } = channelResponse;
    const result = await findOne(channelModel, { _id: id });
    if (!result) {
      const err = new Error(channelNotFound);
      err.status = 404;
      next(err);
    }
    res
      .status(200)
      .send(successHandler(channelFound, result));
  } catch (error) {
    next(error);
  }
};

const getAllChannels = async (req, res, next) => {
  try {
    const { foundAllChannels } = channelResponse;
    const data = req.body;
    const result = await findMany(channelModel, data);
    res
      .status(200)
      .send(successHandler(foundAllChannels, result));
  } catch (error) {
    next(error);
  }
};

const createChannel = async (req, res, next) => {
  try {
    const {
      name,
      workspace,
      user,
      isPrivate,
      members,
    } = req.body;
    const data = {
      name,
      workspace,
      user,
      isPrivate,
      members,
    };
    const result = await create(channelModel, data);
    const { channelCreated } = channelResponse;

    res
      .status(201)
      .send(successHandler(channelCreated, result));
  } catch (error) {
    next(error);
  }
};

const deleteChannel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteDoc(channelModel, id);
    const { channelDeleted } = channelResponse;

    res
      .status(200)
      .send(successHandler(channelDeleted, result));
  } catch (error) {
    next(error);
  }
};

const updateChannel = async (req, res, next) => {
  try {
    const { id, dataToUpdate } = req.body;
    const result = await update(channelModel, id, dataToUpdate);
    const { channelUpdated } = channelResponse;

    res
      .status(200)
      .send(successHandler(channelUpdated, result));
  } catch (error) {
    next(error);
  }
};

export {
  getChannel,
  createChannel,
  getAllChannels,
  deleteChannel,
  updateChannel,
};
