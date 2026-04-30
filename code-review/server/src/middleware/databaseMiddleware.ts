import { DataSource } from 'typeorm';
import { Request, Response, NextFunction } from 'express';

export const databaseMiddleware =
	(db: DataSource) => (req: Request, res: Response, next: NextFunction) => {
		req.db = db;
		next();
	};
