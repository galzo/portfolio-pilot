import fs from 'fs';
import sqlite3 from 'sqlite3';
import { DB_SOURCE } from '../common/constants';

const isDbInitialized = () => fs.existsSync(DB_SOURCE);

const initializeDb = () => {
	console.log('initializing db');

	const db = new sqlite3.Database(DB_SOURCE);
	db.serialize(() => {
		db.run(
			'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)'
		);
		db.run(
			'CREATE TABLE IF NOT EXISTS Portfolio (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, asset TEXT, quantity INTEGER)'
		);
	});
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
