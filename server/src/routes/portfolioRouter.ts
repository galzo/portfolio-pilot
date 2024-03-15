import express from 'express';
import { getPortfolio } from '../controllers/portfolioController';

const portfolioRouter = express.Router();
portfolioRouter.get('/', getPortfolio);

export { portfolioRouter };
