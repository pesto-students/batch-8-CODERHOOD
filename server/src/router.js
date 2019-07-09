import * as express from 'express';
import userRouter from './Controller/User/routes';

const router = express.Router();

router.use('/user', userRouter);

export default router;
