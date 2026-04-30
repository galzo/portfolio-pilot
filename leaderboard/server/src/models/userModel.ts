import { User } from '../entities/user';
import { hashPassword } from '../utils/passwordUtils';
import { BaseModel } from './baseModel';

export class UserModel extends BaseModel {
	insertUser = async (
		name: string,
		email: string,
		password: string,
		isAdmin: boolean
	) => {
		const user = this.buildUserEntity(name, email, password, isAdmin);
		return this.userRepo.save(user);
	};

	getUserByEmail = async (email: string) =>
		this.userRepo.findOne({ where: { email } });

	getUserById = async (id: number) => this.userRepo.findOne({ where: { id } });

	getAllUsers = async (): Promise<User[]> => this.userRepo.find();

	private get userRepo() {
		return this.db.getRepository(User);
	}

	private buildUserEntity = (
		name: string,
		email: string,
		password: string,
		isAdmin: boolean
	) => {
		const user = new User();
		user.name = name;
		user.email = email;
		user.isAdmin = isAdmin;
		user.password = password;

		return user;
	};
}
