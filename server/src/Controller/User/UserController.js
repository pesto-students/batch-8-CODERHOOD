import {
  create,
  deleteDoc,
  findOne,
  findMany,
  update,
} from '../../Repositories/genericRepository';
import successHandler from '../../libs/routes/successHandler';
import { userModel } from '../../Model';


const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await findOne(userModel, id);
    if (!result) {
      const err = new Error('User does not exists');
      next(err);
    }
    res
      .status(200)
      .send(successHandler('User is here', result));
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const result = await findMany(userModel);
    res
      .status(200)
      .send(successHandler('Users are here', result));
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = { name, email, password };
    const result = await create(userModel, data);

    res
      .status(200)
      .send(successHandler('User created successfully', result));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteDoc(userModel, id);

    res
      .status(200)
      .send(successHandler('User deleted successfully', result));
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id, dataToUpdate } = req.body;
    const result = await update(userModel, id, dataToUpdate);

    res
      .status(200)
      .send(successHandler('User updated successfully', result));
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
