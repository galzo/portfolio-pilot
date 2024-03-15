import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { hashPassword } from '../utils/passwordUtils';
import {
	conflictResponse,
	internalServerErrorResponse,
	okResponse,
	unauthorizedResponse,
} from '../utils/responseUtils';
import { isUserPasswordMatching } from '../utils/userUtils';
import { generateJwtToken } from '../utils/authUtils';

interface SignupRequest {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

interface SignupResponse {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
	token: string;
}

interface LoginUserRequest {
	email: string;
	password: string;
}

export const signup = async (req: Request, res: Response) => {
	try {
		const { name, email, password, isAdmin } = req.body as SignupRequest;

		console.log(`Trying to signup user: ${email}`);
		const userModel = new UserModel(req.db);
		const hashedPassword = await hashPassword(password);

		const userExists = await userModel.getUserByEmail(email);
		if (userExists) {
			conflictResponse(res, 'User email already exists');
			return;
		}

		const user = await userModel.insertUser(
			name,
			email,
			hashedPassword,
			isAdmin
		);

		const responsePayload: SignupResponse = {
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateJwtToken(user),
		};

		console.log('User signup success');
		okResponse(res, { responsePayload });
	} catch (e) {
		console.error('Failed creating user', e);
		internalServerErrorResponse(res);
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const userModel = new UserModel(req.db);

		const { email, password } = req.body as LoginUserRequest;
		console.log(`Trying to login user: ${email}`);

		const user = await userModel.getUserByEmail(email);
		if (!user) {
			unauthorizedResponse(res, 'User email or password are incorrect');
			return;
		}

		const isMatching = await isUserPasswordMatching(user, password);
		if (!isMatching) {
			unauthorizedResponse(res, 'User email or password are incorrect');
			return;
		}

		const token = generateJwtToken(user);
		console.log('User login Success');

		okResponse(res, { token });
	} catch (e) {
		console.error('Failed login user', e);
		internalServerErrorResponse(res);
	}
};
