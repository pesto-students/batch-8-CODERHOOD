import * as express from 'express';
import {
  getUser,
  createUser,
  getAllUsers,
  getSelectedUsers,
  deleteUser,
  updateUser,
  login,
} from './UserController';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', getSelectedUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/', updateUser);
userRouter.post('/login', login);

export default userRouter;
