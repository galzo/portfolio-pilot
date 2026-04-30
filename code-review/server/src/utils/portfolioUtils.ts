/* eslint-disable no-plusplus */
import { shuffle } from 'lodash';
import { Stock } from '../entities/stock';
import { User } from '../entities/user';
import { DataSource } from 'typeorm';
import { PortfolioModel } from '../models/portfolioModel';
import { StockModel } from '../models/stockModel';
import { PortfolioStockModel } from '../models/portfolioStockModel';
const pickRandomStocks = (stocks: Stock[], amountToTake: number) =>
	shuffle(stocks).slice(0, amountToTake);

export const generateRandomNumber = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min) + min);

export const pickRandomPositions = (
	minAmountForPosition: number,
	maxAmountForPosition: number,
	allStocks: Stock[]
) => {
	const numOfPositions = generateRandomNumber(1, 4);
	const stocksPicked = pickRandomStocks(allStocks, numOfPositions);
	return stocksPicked.map((stock) => ({
		stock,
		amount: generateRandomNumber(minAmountForPosition, maxAmountForPosition),
	}));
};

export const createPortfolioForNewUser = async (db: DataSource, user: User) => {
	const portfolioModel = new PortfolioModel(db);
	const stockModel = new StockModel(db);
	const portfolioStockModel = new PortfolioStockModel(db);

	const allStocks = await stockModel.getAllStocks();
	const positionsToOpen = pickRandomPositions(1, 10, allStocks);

	const portfolio = await portfolioModel.insertPortfolio(
		`${user.name}'s Portfolio`,
		generateRandomNumber(1000, 10000),
		user
	);

	positionsToOpen.forEach(async (position) => {
		await portfolioStockModel.insertPortfolioStock(
			position.amount,
			position.stock,
			portfolio
		);
	});
};
