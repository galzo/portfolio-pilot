/* eslint-disable no-plusplus */
import { shuffle } from 'lodash';
import { Stock } from '../entities/stock';

const pickRandomStocks = (stocks: Stock[], amountToTake: number) =>
	shuffle(stocks).slice(0, amountToTake);

export const generateRandomNumber = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min) + min);

export const pickRandomPositions = (
	minAmountForPosition: number,
	maxAmountForPosition: number,
	allStocks: Stock[]
) => {
	const numOfPositions = generateRandomNumber(
		minAmountForPosition,
		maxAmountForPosition
	);
	const stocksPicked = pickRandomStocks(allStocks, numOfPositions);
	return stocksPicked.map((stock) => ({
		stock,
		amount: generateRandomNumber(minAmountForPosition, maxAmountForPosition),
	}));
};
