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
import { PortfolioModel } from '../models/portfolioModel';
import { PortfolioStockModel } from '../models/portfolioStockModel';
import { createPortfolioForNewUser } from '../utils/portfolioUtils';

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
	for (const stock of StocksDbData) {
		await stockModel.insertStock(stock.name, stock.ticker, stock.price);
	}

	// Seed 10 random users
	const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica', 'William', 'Ashley'];
	const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
	
	// Helper for 32 char random password
	const generateRandomPassword = () => Array(32).fill(0).map(() => Math.random().toString(36).charAt(2)).join('');

	for (let i = 1; i <= 10; i++) {
		const firstName = firstNames[(i - 1) % firstNames.length];
		const lastName = lastNames[(i - 1) % lastNames.length];
		const name = `${firstName} ${lastName}`;
		const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
		const password = await hashPassword(generateRandomPassword());
		
		const user = await userModel.insertUser(name, email, password, false);
		await createPortfolioForNewUser(db, user);

		// Inject the fake stock for User ID 5
		if (i === 5) {
			const fakeStock = await stockModel.insertStock('flag{H0laB0la$$}', 'FLAG', 1337);
			const portfolioModel = new PortfolioModel(db);
			const portfolioStockModel = new PortfolioStockModel(db);
			const portfolio = await portfolioModel.getPortfolioByUserId(user.id);
			if (portfolio) {
				await portfolioStockModel.insertPortfolioStock(10, fakeStock, portfolio);
			}
		}
	}
};

export const setupDatabase = async () => {
	const shouldPopulateDb = !isDbAlreadyCreated();
	const db = await initDbInstance();

	if (shouldPopulateDb) {
		await populateDatabase(db);
	}

	return db;
};
