import express from 'express';
import { buyPosition, getPortfolio } from '../controllers/portfolioController';

const portfolioRouter = express.Router();
portfolioRouter.get('/', getPortfolio);
portfolioRouter.post('/buy', buyPosition);

export { portfolioRouter };
