import fs from 'fs';
import sqlite3 from 'sqlite3';
import { hashPassword } from './passwordManager';
import { ADMIN_USER_DETAILS, DB_SOURCE } from '../common/constants';
import {
	createPortfolioStockTableCmd,
	createPortfolioTableCmd,
	createStockTableCmd,
	createUserTableCmd,
	insertAdminUserCmd,
} from './dbQueryBuilder';

const isDbInitialized = () => fs.existsSync(DB_SOURCE);
const getDbInstance = () => new sqlite3.Database(DB_SOURCE);

const initializeDb = () => {
	console.log('initializing db');

	const db = getDbInstance();
	db.serialize(() => {
		console.log('Setting up db tables...');
		db.run(createUserTableCmd());
		db.run(createStockTableCmd());
		db.run(createPortfolioTableCmd());
		db.run(createPortfolioStockTableCmd());
		console.log('done setting up db tables.');
	});

	db.close();
};

const populateDbWithData = () => {
	const db = getDbInstance();

	console.log('Setting up basic db data');
	db.run(insertAdminUserCmd(), [
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
	populateDbWithData();
};
