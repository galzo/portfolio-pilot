import { Stock } from '../entities/stock';
import { BaseModel } from './baseModel';

export class StockModel extends BaseModel {
	insertStock = async (
		name: string,
		ticker: string,
		price: number
	): Promise<Stock> => {
		const stock = this.buildStockEntity(name, ticker, price);
		return this.stockRepo.save(stock);
	};

	getAllStocks = async (): Promise<Stock[]> => this.stockRepo.find();

	getStockById = async (id: number) =>
		this.stockRepo.findOne({ where: { id } });

	private get stockRepo() {
		return this.db.getRepository(Stock);
	}

	private buildStockEntity = (
		name: string,
		ticker: string,
		price: number
	): Stock => {
		const stock = new Stock();
		stock.name = name;
		stock.ticker = ticker;
		stock.price = price;
		return stock;
	};
}
