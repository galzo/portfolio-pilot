import { Router } from 'express';
import { check, getCode, submit, unlock } from '../controllers/challengeController';

export const challengeRouter = Router();

challengeRouter.post('/unlock', unlock);
challengeRouter.get('/code', getCode);
challengeRouter.post('/check', check);
challengeRouter.post('/submit', submit);
