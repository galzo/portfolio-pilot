import { Request, Response } from 'express';
import {
	internalServerErrorResponse,
	okResponse,
} from '../utils/responseUtils';
import { StockModel } from '../models/stockModel';
import { Stock } from '../entities/stock';

interface GetAllStocksResponse {
	stocks: Stock[];
}

export const getAllStocks = async (req: Request, res: Response) => {
	try {
		console.log('Fetching all stocks in system');
		const stockModel = new StockModel(req.db);
		const allStocks = await stockModel.getAllStocks();
		const responsePayload: GetAllStocksResponse = {
			stocks: allStocks,
		};
		console.log('Successfully fetched all stocks');

		okResponse(res, responsePayload);
	} catch (e) {
		console.error('Failed to fetch all stocks', e);
		internalServerErrorResponse(res);
	}
};
