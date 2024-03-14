import { DataSource } from 'typeorm';
import { JwtUserDetails } from '../utils/authUtils';

declare module 'express-serve-static-core' {
	interface Request {
		db: DataSource;
		user: User;
	}
}
