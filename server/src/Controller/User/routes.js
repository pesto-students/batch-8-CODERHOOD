import * as express from 'express';
import {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from './UserController';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/', updateUser);

export default userRouter;
