import { AppDatabase } from '../infrastructure/database';
import { createStockTableCmd } from '../infrastructure/dbQueryBuilder';

export interface Stock {
	id: number;
	name: string;
	ticker: string;
}

export class StockModel {
	db: AppDatabase;

	constructor(db: AppDatabase) {
		this.db = db;
	}

	createTable = async () => {
		await this.db.runQuery(createStockTableCmd());
	};
}
