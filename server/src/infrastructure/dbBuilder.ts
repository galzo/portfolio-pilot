import fs from 'fs';
import sqlite3 from 'sqlite3';
import { DB_SOURCE } from '../common/constants';
import {
	createPortfolioStockTableCmd,
	createPortfolioTableCmd,
	createStockTableCmd,
	createUserTableCmd,
} from './dbQueryBuilder';

const isDbInitialized = () => fs.existsSync(DB_SOURCE);

const initializeDb = () => {
	console.log('initializing db');

	const db = new sqlite3.Database(DB_SOURCE);
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

export const bootstrapDb = async () => {
	console.log('Checking if db is initialized');
	const isInit = isDbInitialized();
	if (isInit) {
		console.log('db is already initialized');
		return;
	}

	initializeDb();
};
