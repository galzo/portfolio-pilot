import { AppDatabase } from '../infrastructure/database';
import {
	createUserTableCmd,
	insertUserCmd,
} from '../infrastructure/dbQueryBuilder';
import { hashPassword } from '../infrastructure/passwordManager';

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

export class UserModel {
	db: AppDatabase;

	constructor(db: AppDatabase) {
		this.db = db;
	}

	createTable = async () => {
		await this.db.runQuery(createUserTableCmd());
	};

	insertUser = async (user: User) => {
		await this.db.runQuery(insertUserCmd(), [
			user.name,
			user.email,
			hashPassword(user.password),
			user.isAdmin,
		]);
	};

	closeDb = () => {
		this.db.close();
	};
}
