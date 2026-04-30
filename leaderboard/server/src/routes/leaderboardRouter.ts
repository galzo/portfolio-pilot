import { Router } from 'express';
import { signup, login, submitFlag, getLeaderboard } from '../controllers/leaderboardController';

export const leaderboardRouter = Router();

leaderboardRouter.post('/signup', signup);
leaderboardRouter.post('/login', login);
leaderboardRouter.post('/submit', submitFlag);
leaderboardRouter.get('/leaderboard', getLeaderboard);
