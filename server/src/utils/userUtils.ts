import { User } from '../entities/user';
import { Optional } from '../common/baseTypes';
import { comparePassword } from './passwordUtils';

export const isUserPasswordMatching = async (
	user: Optional<User>,
	password: string
) => {
	if (!user) return false;
	return comparePassword(password, user.password);
};
