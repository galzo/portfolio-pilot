import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import cors from 'cors';
import { setupDatabase } from './database/database';
import { databaseMiddleware } from './middleware/databaseMiddleware';
import { userRouter } from './routes/userRouter';
import { loadEnvironmentVars } from './utils/envUtils';
import { portfolioRouter } from './routes/portfolioRouter';

const setupEnvironment = () => {
	const environment = process.env.NODE_ENV || 'development';
	loadEnvironmentVars(environment);
};

const setupServer = (db: DataSource) => {
	const app = express();

	// Setup middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(databaseMiddleware(db));

	// Setup routers
	app.use('/api/user', userRouter);
	app.use('/api/portfolio', portfolioRouter);
	return app;
};

const runApp = async () => {
	setupEnvironment();
	const db = await setupDatabase();
	const app = setupServer(db);

	app.listen(process.env.SERVER_PORT, () => {
		console.log(`listening on port ${process.env.SERVER_PORT}`);
	});
};

runApp();
