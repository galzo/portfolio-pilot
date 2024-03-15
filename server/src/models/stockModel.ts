import { Stock } from '../entities/stock';
import { BaseModel } from './baseModel';

export class StockModel extends BaseModel {
	insertStock = async (name: string, ticker: string): Promise<Stock> => {
		const stock = this.buildStockEntity(name, ticker);
		return this.stockRepo.save(stock);
	};

	getAllStocks = async (): Promise<Stock[]> => this.stockRepo.find();

	private get stockRepo() {
		return this.db.getRepository(Stock);
	}

	private buildStockEntity = (name: string, ticker: string): Stock => {
		const stock = new Stock();
		stock.name = name;
		stock.ticker = ticker;
		return stock;
	};
}
