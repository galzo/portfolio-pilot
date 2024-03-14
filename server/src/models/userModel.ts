import { User } from '../entities/user';
import { hashPassword } from '../infrastructure/passwordManager';
import { BaseModel } from './baseModel';

export class UserModel extends BaseModel {
	insertUser = async (
		name: string,
		email: string,
		password: string,
		isAdmin: boolean
	) => {
		const user = await this.buildUserEntity(name, email, password, isAdmin);
		return this.userRepo.save(user);
	};

	private get userRepo() {
		return this.db.getRepository(User);
	}

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
