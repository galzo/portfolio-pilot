import { Router } from 'express';
import { getCaptcha, getLeaderboard, login, signup, submitFlag } from '../controllers/leaderboardController';

export const leaderboardRouter = Router();

leaderboardRouter.post('/signup', signup);
leaderboardRouter.post('/login', login);
leaderboardRouter.get('/captcha', getCaptcha);
leaderboardRouter.post('/submit', submitFlag);
leaderboardRouter.get('/leaderboard', getLeaderboard);
