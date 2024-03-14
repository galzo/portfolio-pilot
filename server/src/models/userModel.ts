import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { hashPassword } from '../infrastructure/passwordManager';

export class UserModel {
	private db: DataSource;

	constructor(db: DataSource) {
		this.db = db;
	}

	insertUser = async (
		name: string,
		email: string,
		password: string,
		isAdmin: boolean
	) => {
		const user = await this.buildUserEntity(name, email, password, isAdmin);
		return this.db.getRepository(User).save(user);
	};

	private buildUserEntity = async (
		name: string,
		email: string,
		password: string,
		isAdmin: boolean
	) => {
		const user = new User();
		user.name = name;
		user.email = email;
		user.isAdmin = isAdmin;
		user.password = await hashPassword(password);

		return user;
	};
}
