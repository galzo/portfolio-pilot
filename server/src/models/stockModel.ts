import { DataSource } from 'typeorm';
import { Stock } from '../entities/stock';

export class StockModel {
	private db: DataSource;

	constructor(db: DataSource) {
		this.db = db;
	}

	insertStock = async (stock: Stock) =>
		this.db.getRepository(Stock).save(stock);
}
