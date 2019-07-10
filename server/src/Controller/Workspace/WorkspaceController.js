import {
  create,
  deleteDoc,
  findOne,
  findMany,
  update,
} from '../../Repositories/genericRepository';
import successHandler from '../../libs/routes/successHandler';
import { workspaceResponse } from '../../Constants/constants';
import { workspaceModel } from '../../Model';


const getWorkspace = async (req, res, next) => {
  try {
    const { workspaceFound, workspaceNotFound } = workspaceResponse;
    const { id } = req.params;
    const result = await findOne(workspaceModel, id);
    if (!result || result === null) {
      const err = new Error(workspaceNotFound);
      err.status = 404;
      next(err);
    }
    res
      .status(200)
      .send(successHandler(workspaceFound, result));
  } catch (error) {
    next(error);
  }
};

const getAllWorkspaces = async (req, res, next) => {
  try {
    const { foundAllWorkspaces } = workspaceResponse;
    const result = await findMany(workspaceModel);
    res
      .status(200)
      .send(successHandler(foundAllWorkspaces, result));
  } catch (error) {
    next(error);
  }
};

const createWorkspace = async (req, res, next) => {
  try {
    const { name, user, members } = req.body;
    const { workspaceCreated } = workspaceResponse;
    const data = { name, user, members };
    const result = await create(workspaceModel, data);

    res
      .status(201)
      .send(successHandler(workspaceCreated, result));
  } catch (error) {
    next(error);
  }
};

const deleteWorkspace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { workspaceDeleted } = workspaceResponse;
    const result = await deleteDoc(workspaceModel, id);

    res
      .status(200)
      .send(successHandler(workspaceDeleted, result));
  } catch (error) {
    next(error);
  }
};

const updateWorkspace = async (req, res, next) => {
  try {
    const { id, dataToUpdate } = req.body;
    const { workspaceUpdated } = workspaceResponse;
    const result = await update(workspaceModel, id, dataToUpdate);

    res
      .status(200)
      .send(successHandler(workspaceUpdated, result));
  } catch (error) {
    next(error);
  }
};

export {
  getWorkspace,
  createWorkspace,
  getAllWorkspaces,
  deleteWorkspace,
  updateWorkspace,
};
