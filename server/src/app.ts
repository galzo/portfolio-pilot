import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import { setupDatabase } from './infrastructure/database';
import { APP_PORT } from './common/constants';
import { databaseMiddleware } from './middleware/databaseMiddleware';

const setupServer = (db: DataSource) => {
	const app = express();
	app.use(bodyParser.json());
	app.use(databaseMiddleware(db));
	return app;
};

const runServer = async () => {
	const db = await setupDatabase();
	const app = setupServer(db);

	app.listen(APP_PORT, () => {
		console.log(`listening on port ${APP_PORT}`);
	});
};

runServer();
