import { Request, Response, NextFunction } from 'express';
import { unauthorizedResponse } from '../utils/responseUtils';
import { decodeJwtToken } from '../utils/authUtils';
import { UserModel } from '../models/userModel';

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		const userDetails = token ? decodeJwtToken(token) : null;

		if (!userDetails?.userId) {
			unauthorizedResponse(res);
			return;
		}

		const userModel = new UserModel(req.db);
		const userOnDb = await userModel.getUserById(userDetails.userId);
		if (!userOnDb) {
			unauthorizedResponse(res);
			return;
		}

		req.user = userOnDb;
		next();
	} catch (e) {
		console.error('Failed authenticating user', e);
		unauthorizedResponse(res);
	}
};
