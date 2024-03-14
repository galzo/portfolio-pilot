import { DataSource } from 'typeorm';

declare module 'express-serve-static-core' {
	interface Request {
		db: DataSource;
	}
}
