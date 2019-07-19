import {
  create,
  deleteDoc,
  findOne,
  findMany,
  update,
} from '../../Repositories/genericRepository';
import successHandler from '../../libs/routes/successHandler';
import { messageResponse } from '../../Constants/constants';
import { messageModel } from '../../Model';


const getMessage = async (req, res, next) => {
  try {
    const { messageFound, messageNotFound } = messageResponse;
    const { id } = req.params;
    const result = await findOne(messageModel, id);
    if (!result) {
      const err = new Error(messageNotFound);
      err.status = 404;
      next(err);
    }
    res
      .status(200)
      .send(successHandler(messageFound, result));
  } catch (error) {
    next(error);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const data = req.body;
    const { foundAllMessages } = messageResponse;
    const result = await findMany(messageModel, data);
    res
      .status(200)
      .send(successHandler(foundAllMessages, result));
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const {
      to,
      from,
      message,
      workspace,
      channel,
      createdAt,
      modifiedAt,
      isComment,
    } = req.body;
    const data = {
      to,
      from,
      message,
      workspace,
      channel,
      createdAt,
      modifiedAt,
      isComment,
    };
    const result = await create(messageModel, data);
    const { messageCreated } = messageResponse;

    res
      .status(201)
      .send(successHandler(messageCreated, result));
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { messageDeleted } = messageResponse;
    const result = await deleteDoc(messageModel, id);

    res
      .status(200)
      .send(successHandler(messageDeleted, result));
  } catch (error) {
    next(error);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const { id, dataToUpdate } = req.body;
    const { messageUpdated } = messageResponse;
    const result = await update(messageModel, id, dataToUpdate);

    res
      .status(200)
      .send(successHandler(messageUpdated, result));
  } catch (error) {
    next(error);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const { userA, userB } = req.body;
    const { foundAllMessages } = messageResponse;
    const query = {
      $or: [
        {
          from: userA,
          to: userB,
        },
        {
          from: userB,
          to: userA,
        },
      ],
    };
    const result = await findMany(messageModel, query);
    res
      .status(200)
      .send(successHandler(foundAllMessages, result));
  } catch (error) {
    next(error);
  }
};

export {
  getMessage,
  createMessage,
  getAllMessages,
  deleteMessage,
  updateMessage,
  getConversation,
};
