import fs from 'fs';
import sqlite3 from 'sqlite3';
import { hashPassword } from './passwordManager';
import { ADMIN_USER_DETAILS, DB_SOURCE } from '../common/constants';
import {
	createPortfolioStockTableCmd,
	createPortfolioTableCmd,
	createStockTableCmd,
	createUserTableCmd,
	insertUserCmd,
} from './dbQueryBuilder';
import { AppDatabase } from './database';
import { UserModel } from '../models/userModel';
import { StockModel } from '../models/stockModel';

const isDbInitialized = () => fs.existsSync(DB_SOURCE);

const initializeDb = async () => {
	console.log('initializing db');
	const db = new AppDatabase();

	db.serialize(async () => {
		console.log('Setting up db tables...');
		await new UserModel(db).createTable();
		await new StockModel(db).createTable();
	});
};

const populateDbWithData = (db: sqlite3.Database) => {
	console.log('Setting up basic db data');
	db.run(insertUserCmd(), [
		ADMIN_USER_DETAILS.name,
		ADMIN_USER_DETAILS.email,
		hashPassword(ADMIN_USER_DETAILS.password),
		1,
	]);
};

export const bootstrapDb = async () => {
	console.log('Checking if db is initialized');

	const isInit = isDbInitialized();
	if (isInit) {
		console.log('db is already initialized');
		return;
	}

	initializeDb();
	// populateDbWithData();
};
