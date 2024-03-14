import { DataSource } from 'typeorm';
import { DB_SOURCE } from '../common/constants';
import { Stock } from '../models/stock';

export const initializeDb = () => {
	const appDataSource = new DataSource({
		type: 'sqlite',
		database: DB_SOURCE,
		synchronize: true,
		entities: [Stock],
	});

	appDataSource.initialize().then(() => {
		console.log('done!');
	});
};
