import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import { setupDatabase } from './database/database';
import { APP_PORT } from './common/constants';
import { databaseMiddleware } from './middleware/databaseMiddleware';
import { userRouter } from './routes/userRouter';

const setupServer = (db: DataSource) => {
	const app = express();
	app.use(bodyParser.json());
	app.use(databaseMiddleware(db));
	app.use('/api/user', userRouter);
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
