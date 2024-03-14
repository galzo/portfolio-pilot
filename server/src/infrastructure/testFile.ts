import { DataSource } from 'typeorm';
import { DB_SOURCE } from '../common/constants';
import { Stock } from '../entities/stock';
import { Portfolio } from '../entities/portfolio';
import { PortfolioStock } from '../entities/portfolioStock';
import { User } from '../entities/user';

export const initializeDb = () => {
	const appDataSource = new DataSource({
		type: 'sqlite',
		database: DB_SOURCE,
		synchronize: true,
		entities: [Stock, Portfolio, PortfolioStock, User],
	});

	appDataSource.initialize().then(() => {
		console.log('done!');
	});
};
