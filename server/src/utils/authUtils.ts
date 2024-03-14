import jwt from 'jsonwebtoken';
import { User } from '../entities/user';

const getJwtSecretKey = () => process.env.JWT_SECRET || '';

export interface JwtUserDetails {
	userId: number;
}

export const generateJwtToken = (user: User): string => {
	const payload: JwtUserDetails = { userId: user.id };
	return jwt.sign(payload, getJwtSecretKey());
};

export const decodeJwtToken = (token: string): JwtUserDetails => {
	const decodedToken = jwt.verify(token, getJwtSecretKey()) as JwtUserDetails;
	return decodedToken;
};
