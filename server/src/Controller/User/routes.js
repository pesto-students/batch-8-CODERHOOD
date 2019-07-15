import * as express from 'express';
import {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  login,
} from './UserController';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/', updateUser);
userRouter.post('/login', login);

export default userRouter;
