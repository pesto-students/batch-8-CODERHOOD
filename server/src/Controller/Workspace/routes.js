import * as express from 'express';
import {
  getWorkspace,
  createWorkspace,
  getAllWorkspaces,
  deleteWorkspace,
  updateWorkspace,
} from './WorkspaceController';

const workspaceRouter = express.Router();

workspaceRouter.post('/all', getAllWorkspaces);
workspaceRouter.get('/:id', getWorkspace);
workspaceRouter.post('/', createWorkspace);
workspaceRouter.delete('/:id', deleteWorkspace);
workspaceRouter.put('/', updateWorkspace);

export default workspaceRouter;
