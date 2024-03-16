import { hashPassword } from './../utils/passwordUtils';
import { DataSource } from 'typeorm';
import fs from 'fs';
import { AdminUserDbData, StocksDbData } from '../common/constants';
import { Stock } from '../entities/stock';
import { Portfolio } from '../entities/portfolio';
import { PortfolioStock } from '../entities/portfolioStock';
import { User } from '../entities/user';
import { StockModel } from '../models/stockModel';
import { UserModel } from '../models/userModel';

const getDbFileName = () => process.env.DB_FILE || 'db.sqlite';
const isDbAlreadyCreated = () => fs.existsSync(getDbFileName());

const initDbInstance = async () => {
	console.log('Initalizing DB...');

	const db = new DataSource({
		type: 'sqlite',
		database: getDbFileName(),
		synchronize: true,
		entities: [Stock, Portfolio, PortfolioStock, User],
	});

	await db.initialize();
	return db;
};

const populateDatabase = async (db: DataSource) => {
	console.log('Running initial db data population...');

	const userModel = new UserModel(db);
	const hashedPassword = await hashPassword(AdminUserDbData.password);
	userModel.insertUser(
		AdminUserDbData.name,
		AdminUserDbData.email,
		hashedPassword,
		AdminUserDbData.isAdmin
	);

	const stockModel = new StockModel(db);
	StocksDbData.forEach(async (stock) => {
		await stockModel.insertStock(stock.name, stock.ticker, stock.price);
	});
};

export const setupDatabase = async () => {
	const shouldPopulateDb = !isDbAlreadyCreated();
	const db = await initDbInstance();

	if (shouldPopulateDb) {
		await populateDatabase(db);
	}

	return db;
};
