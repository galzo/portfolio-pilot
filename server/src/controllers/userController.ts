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
import { PortfolioModel } from '../models/portfolioModel';
import {
	generateRandomNumber,
	pickRandomPositions,
} from '../utils/portfolioUtils';
import { StockModel } from '../models/stockModel';
import { PortfolioStockModel } from '../models/portfolioStockModel';
import { User } from '../entities/user';

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

interface LoginResponse {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
	token: string;
}

interface GetAllUsersResponse {
	users: User[];
}

const _createPortfolioForNewUser = async (req: Request, user: User) => {
	const portfolioModel = new PortfolioModel(req.db);
	const stockModel = new StockModel(req.db);
	const portfolioStockModel = new PortfolioStockModel(req.db);

	// Pick positions to open within the new portfolio
	const allStocks = await stockModel.getAllStocks();
	const positionsToOpen = pickRandomPositions(1, 10, allStocks);

	// Open a new portfolio
	const portfolio = await portfolioModel.insertPortfolio(
		`${user.name}'s Portfolio`,
		generateRandomNumber(1000, 10000),
		user
	);

	// populate it with stocks
	positionsToOpen.forEach(async (position) => {
		await portfolioStockModel.insertPortfolioStock(
			position.amount,
			position.stock,
			portfolio
		);
	});
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		console.log(`Fetching all users in the system`);
		const userModel = new UserModel(req.db);
		const allUsers = await userModel.getAllUsers();
		const responsePayload: GetAllUsersResponse = { users: allUsers };
		console.log('Successfuly fetched all users');

		okResponse(res, responsePayload);
	} catch (e) {
		console.error('Failed to fetch all users', e);
		internalServerErrorResponse(res);
	}
};

export const signup = async (req: Request, res: Response) => {
	try {
		const { name, email, password, isAdmin } = req.body as SignupRequest;
		console.log(`Trying to signup user: ${email}`);

		const userModel = new UserModel(req.db);
		const hashedPassword = await hashPassword(password);
		const userExists = await userModel.getUserByEmail(email);
		if (userExists) {
			conflictResponse(
				res,
				'User already exists, please try another email or login'
			);
			return;
		}

		const user = await userModel.insertUser(
			name,
			email,
			hashedPassword,
			isAdmin
		);

		await _createPortfolioForNewUser(req, user);

		const responsePayload: SignupResponse = {
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateJwtToken(user),
		};

		console.log('User signup success');
		okResponse(res, responsePayload);
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

		const responsePayload: LoginResponse = {
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateJwtToken(user),
		};

		console.log('User login Success');
		okResponse(res, responsePayload);
	} catch (e) {
		console.error('Failed login user', e);
		internalServerErrorResponse(res);
	}
};
