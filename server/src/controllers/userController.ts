import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { comparePassword, hashPassword } from '../common/passwordUtils';
import {
	internalServerErrorResponse,
	notFoundResponse,
	okResponse,
	unauthorizedResponse,
} from '../common/responseUtils';
import { isUserPasswordMatching } from '../common/userUtils';

interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

interface LoginUserRequest {
	email: string;
	password: string;
}

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, isAdmin } = req.body as CreateUserRequest;

		console.log(`Creating new user: ${email}`);
		const userModel = new UserModel(req.db);
		const hashedPassword = await hashPassword(password);
		await userModel.insertUser(name, email, hashedPassword, isAdmin);
		console.log('User successfully created');

		okResponse(res, 'User signed up successfully');
	} catch (e) {
		console.error('Failed creating user', e);
		internalServerErrorResponse(res);
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body as LoginUserRequest;
		const userModel = new UserModel(req.db);

		const user = await userModel.getUserByEmail(email);
		const isMatching = await isUserPasswordMatching(user, password);

		if (!isMatching) {
			unauthorizedResponse(res, 'User email or password are incorrect');
			return;
		}

		okResponse(res, 'Login successfull');
	} catch (e) {
		console.error('Failed login user', e);
		internalServerErrorResponse(res);
	}
};
