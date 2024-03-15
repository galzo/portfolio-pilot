import { Portfolio } from '../entities/portfolio';
import { PortfolioStock } from '../entities/portfolioStock';
import { Stock } from '../entities/stock';
import { BaseModel } from './baseModel';

export class PortfolioStockModel extends BaseModel {
	insertPortfolioStock = async (
		amount: number,
		stock: Stock,
		portfolio: Portfolio
	) => {
		const portfolioStock = this.buildPortfolioStockEntity(
			amount,
			stock,
			portfolio
		);

		return this.portfolioStockRepo.save(portfolioStock);
	};

	private get portfolioStockRepo() {
		return this.db.getRepository(PortfolioStock);
	}

	private buildPortfolioStockEntity = (
		amount: number,
		stock: Stock,
		portfolio: Portfolio
	) => {
		const portfolioStock = new PortfolioStock();
		portfolioStock.amount = amount;
		portfolioStock.stock = stock;
		portfolioStock.portfolio = portfolio;
		return portfolioStock;
	};
}
