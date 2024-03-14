import { BaseModel } from './baseModel';
import { Portfolio } from '../entities/portfolio';
import { User } from '../entities/user';

export class PortfolioModel extends BaseModel {
	insertPortfolio = async (name: string, cash: number, user: User) => {
		const portfolio = this.buildPortfolioEntity(name, cash, user);
		return this.portfolioRepo.save(portfolio);
	};

	private get portfolioRepo() {
		return this.db.getRepository(Portfolio);
	}

	private buildPortfolioEntity = (name: string, cash: number, user: User) => {
		const portfolio = new Portfolio();
		portfolio.name = name;
		portfolio.cash = cash;
		portfolio.user = user;
		return portfolio;
	};
}
