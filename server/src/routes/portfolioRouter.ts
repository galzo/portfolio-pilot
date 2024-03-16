import express from 'express';
import {
	addFunds,
	buyPosition,
	getPortfolio,
	sellPosition,
} from '../controllers/portfolioController';

const portfolioRouter = express.Router();
portfolioRouter.get('/', getPortfolio);
portfolioRouter.post('/buy', buyPosition);
portfolioRouter.post('/sell', sellPosition);
portfolioRouter.post('/addFunds', addFunds);

export { portfolioRouter };
