import express from 'express';
import { getAllUsers, login, signup } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const userRouter = express.Router();
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/all', authenticate, getAllUsers);

export { userRouter };
