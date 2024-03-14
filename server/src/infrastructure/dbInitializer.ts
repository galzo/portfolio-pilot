import { DataSource } from 'typeorm';
import fs from 'fs';
import { AdminUserDbData, DB_SOURCE, StocksDbData } from '../common/constants';
import { Stock } from '../entities/stock';
import { Portfolio } from '../entities/portfolio';
import { PortfolioStock } from '../entities/portfolioStock';
import { User } from '../entities/user';
import { StockModel } from '../models/stockModel';
import { UserModel } from '../models/userModel';

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

	const userModel = new UserModel(db);
	userModel.insertUser(
		AdminUserDbData.name,
		AdminUserDbData.email,
		AdminUserDbData.password,
		AdminUserDbData.isAdmin
	);

	const stockModel = new StockModel(db);
	StocksDbData.forEach(async (stock) => {
		await stockModel.insertStock(stock.name, stock.ticker);
	});
};

export const bootstrapDb = async () => {
	const shouldPopulateDb = !isDbAlreadyCreated();
	const db = await initDbInstance();

	if (shouldPopulateDb) {
		await populateDb(db);
	}

	return db;
};
