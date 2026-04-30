import { Router } from 'express';
import { unlock, submit } from '../controllers/challengeController';

export const challengeRouter = Router();

challengeRouter.post('/unlock', unlock);
challengeRouter.post('/submit', submit);
