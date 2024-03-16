import { Request, Response } from 'express';
import { PortfolioModel } from '../models/portfolioModel';
import {
	internalServerErrorResponse,
	notFoundResponse,
	okResponse,
} from '../utils/responseUtils';
import { Stock } from '../entities/stock';

interface GetPortfolioResponse {
	id: number;
	name: string;
	cash: number;
	positions: Array<{
		amount: number;
		stock: Stock;
	}>;
}

export const getPortfolio = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.query.userId as string, 10);
		console.log(`Fetching portfolio for userId ${userId}`);

		const portfolioModel = new PortfolioModel(req.db);
		const portfolio = await portfolioModel.getPortfolioByUserId(userId);
		if (!portfolio) {
			notFoundResponse(res, `No portfolio was found for userId ${userId}`);
			return;
		}

		const responsePayload: GetPortfolioResponse = {
			id: portfolio.id,
			name: portfolio.name,
			cash: portfolio.cash,
			positions: portfolio.portfolioStocks.map((position) => ({
				amount: position.amount,
				stock: position.stock,
			})),
		};

		console.log(`Successfully fetched portfolio for userId ${userId}`);
		okResponse(res, responsePayload);
	} catch (e) {
		console.error('Failed to fetch portfolio', e);
		internalServerErrorResponse(res);
	}
};
