import { Request, Response } from 'express';
import { PortfolioModel } from '../models/portfolioModel';
import {
	badRequestResponse,
	internalServerErrorResponse,
	notFoundResponse,
	okResponse,
} from '../utils/responseUtils';
import { Stock } from '../entities/stock';
import { StockModel } from '../models/stockModel';
import { PortfolioStockModel } from '../models/portfolioStockModel';

interface GetPortfolioResponse {
	id: number;
	name: string;
	cash: number;
	positions: Array<{
		amount: number;
		stock: Stock;
	}>;
}

interface BuyPositionRequest {
	userId: number;
	stockId: number;
	amount: number;
}

interface SellPositionRequest {
	userId: number;
	stockId: number;
	amount: number;
}

interface AddFundsRequest {
	portfolioId: number;
	cash: number;
}

export const addFunds = async (req: Request, res: Response) => {
	const portfolioModel = new PortfolioModel(req.db);
	const { portfolioId, cash } = req.body as AddFundsRequest;

	if (cash <= 0) {
		badRequestResponse(res, 'Amount cannot be negative');
		return;
	}

	const targetPortfolio = await portfolioModel.getPortfolioById(portfolioId);
	if (!targetPortfolio) {
		notFoundResponse(res, 'No portfolio was found for given id');
		return;
	}

	const updatedCash = targetPortfolio.cash + cash;
	await portfolioModel.updatePortfolio(portfolioId, updatedCash);
	okResponse(res, { isSuccess: true });
};

export const buyPosition = async (req: Request, res: Response) => {
	const { userId, stockId, amount } = req.body as BuyPositionRequest;
	console.log('Trying to buy position');

	const stockModel = new StockModel(req.db);
	const portfolioModel = new PortfolioModel(req.db);
	const portfolioStockModel = new PortfolioStockModel(req.db);

	const targetStock = await stockModel.getStockById(stockId);
	const targetPortfolio = await portfolioModel.getPortfolioByUserId(userId);

	if (!targetStock || !targetPortfolio) {
		notFoundResponse(res, 'No portfolio or stock were found for given ids');
		return;
	}

	if (amount < 0) {
		badRequestResponse(res, 'Amount cannot be negative');
		return;
	}

	const targetValue = targetStock.price * amount;
	const cashLeft = targetPortfolio.cash - targetValue;
	if (targetValue > targetPortfolio.cash) {
		badRequestResponse(res, 'Insufficient Funds');
		return;
	}

	const targetPosition = targetPortfolio?.portfolioStocks.find(
		(stock) => stock.stock.id === targetStock.id
	);

	if (targetPosition) {
		await portfolioStockModel.updatePortfolioStock(
			targetPosition.id,
			amount + targetPosition.amount
		);
	} else {
		await portfolioStockModel.insertPortfolioStock(
			amount,
			targetStock,
			targetPortfolio
		);
	}

	portfolioModel.updatePortfolio(targetPortfolio.id, cashLeft);
	okResponse(res, { isSuccess: true });
};

export const sellPosition = async (req: Request, res: Response) => {
	const { userId, stockId, amount } = req.body as SellPositionRequest;
	console.log('Trying to sell position');

	const stockModel = new StockModel(req.db);
	const portfolioModel = new PortfolioModel(req.db);
	const portfolioStockModel = new PortfolioStockModel(req.db);

	const targetStock = await stockModel.getStockById(stockId);
	const targetPortfolio = await portfolioModel.getPortfolioByUserId(userId);

	if (!targetStock || !targetPortfolio) {
		notFoundResponse(res, 'No portfolio or stock were found for given ids');
		return;
	}

	if (amount < 0) {
		badRequestResponse(res, 'Amount cannot be negative');
		return;
	}

	const targetValue = targetStock.price * amount;
	const cashLeft = targetPortfolio.cash + targetValue;

	const targetPosition = targetPortfolio?.portfolioStocks.find(
		(stock) => stock.stock.id === targetStock.id
	);

	if (!targetPosition) {
		badRequestResponse(res, 'No position to sell :(');
		return;
	}

	const shouldDelete = targetPosition.amount - amount === 0;
	if (shouldDelete) {
		await portfolioStockModel.deletePortfolioStock(targetPosition.id);
	} else {
		await portfolioStockModel.updatePortfolioStock(
			targetPosition.id,
			targetPosition.amount - amount
		);
	}

	portfolioModel.updatePortfolio(targetPortfolio.id, cashLeft);

	okResponse(res, { isSuccess: true });
};

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
