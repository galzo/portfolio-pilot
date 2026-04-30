import { User } from '../entities/user';
import { Optional } from '../common/baseTypes';
import { comparePassword } from './passwordUtils';

export const isUserPasswordMatching = async (user: User, password: string) =>
	comparePassword(password, user.password);
