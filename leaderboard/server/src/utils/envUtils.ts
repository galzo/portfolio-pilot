import dotenv from 'dotenv';

export const loadEnvironmentVars = (environment: string) => {
	const envFilePath = `.env.${environment}`;
	dotenv.config({ path: envFilePath });
};
