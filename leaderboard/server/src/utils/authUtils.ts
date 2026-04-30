import jwt from 'jsonwebtoken';
import { User } from '../entities/user';

const _getJwtSecretKey = () => process.env.JWT_SECRET || '';

export interface JwtUserDetails {
	userId: number;
	userEmail: string;
	userName: string;
}

export const generateJwtToken = (user: User): string => {
	const payload: JwtUserDetails = {
		userId: user.id,
		userEmail: user.email,
		userName: user.name,
	};
	return jwt.sign(payload, _getJwtSecretKey());
};

export const decodeJwtToken = (token: string): JwtUserDetails => {
	const decodedToken = jwt.verify(token, _getJwtSecretKey()) as JwtUserDetails;
	return decodedToken;
};
