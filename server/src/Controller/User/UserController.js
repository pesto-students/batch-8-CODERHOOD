import {
  create,
  deleteDoc,
  findOne,
  findMany,
  update,
} from '../../Repositories/genericRepository';
import successHandler from '../../libs/routes/successHandler';
import { userResponse } from '../../Constants/constants';
import { userModel } from '../../Model';


const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userFound, userNotFound } = userResponse;
    const result = await findOne(userModel, id);
    if (!result) {
      const err = new Error(userNotFound);
      err.status = 404;
      next(err);
    }
    res
      .status(200)
      .send(successHandler(userFound, result));
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { foundAllUsers } = userResponse;
    const result = await findMany(userModel);
    res
      .status(200)
      .send(successHandler(foundAllUsers, result));
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      bio,
    } = req.body;
    const data = {
      name,
      email,
      password,
      bio,
    };
    const result = await create(userModel, data);
    const { userCreated } = userResponse;

    res
      .status(201)
      .send(successHandler(userCreated, result));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userDeleted } = userResponse;
    const result = await deleteDoc(userModel, id);

    res
      .status(200)
      .send(successHandler(userDeleted, result));
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id, dataToUpdate } = req.body;
    const { userUpdated } = userResponse;
    const result = await update(userModel, id, dataToUpdate);

    res
      .status(200)
      .send(successHandler(userUpdated, result));
  } catch (error) {
    next(error);
  }
};

export {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
