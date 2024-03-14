import { DataSource } from 'typeorm';
import { Stock } from '../entities/stock';

export class StockModel {
	private db: DataSource;

	constructor(db: DataSource) {
		this.db = db;
	}

	insertStock = async (name: string, ticker: string): Promise<Stock> => {
		const stock = this.buildStockEntity(name, ticker);
		return this.db.getRepository(Stock).save(stock);
	};

	private buildStockEntity = (name: string, ticker: string): Stock => {
		const stock = new Stock();
		stock.name = name;
		stock.ticker = ticker;
		return stock;
	};
}
