import express from 'express';
import {
	buyPosition,
	getPortfolio,
	sellPosition,
} from '../controllers/portfolioController';

const portfolioRouter = express.Router();
portfolioRouter.get('/', getPortfolio);
portfolioRouter.post('/buy', buyPosition);
portfolioRouter.post('/sell', sellPosition);

export { portfolioRouter };
