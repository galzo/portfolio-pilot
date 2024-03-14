import { DataSource } from 'typeorm';
import fs from 'fs';
import { DB_SOURCE } from '../common/constants';
import { Stock } from '../entities/stock';
import { Portfolio } from '../entities/portfolio';
import { PortfolioStock } from '../entities/portfolioStock';
import { User } from '../entities/user';
import { StockModel } from '../models/stockModel';

const isDbAlreadyCreated = () => fs.existsSync(DB_SOURCE);

const initDbInstance = async () => {
	console.log('Initalizing DB...');

	const db = new DataSource({
		type: 'sqlite',
		database: DB_SOURCE,
		synchronize: true,
		entities: [Stock, Portfolio, PortfolioStock, User],
	});

	await db.initialize();
	return db;
};

const populateDb = async (db: DataSource) => {
	console.log('Running initial db data population...');
	const stockModel = new StockModel(db);
	const stock = new Stock();
	stock.name = 'apple';
	stock.ticker = 'AAPL';
	await stockModel.insertStock(stock);
};

export const bootstrapDb = async () => {
	const shouldPopulateDb = !isDbAlreadyCreated();
	const db = await initDbInstance();

	if (shouldPopulateDb) {
		await populateDb(db);
	}

	return db;
};
