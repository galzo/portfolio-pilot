import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => {
	const result = await bcrypt.compare(password, hashedPassword);
	return result;
};
