import { Response } from 'express';

export const internalServerErrorResponse = (
	response: Response,
	message: string = 'Internal Server Error'
) => {
	console.error(`Returning (500) response. message: ${message}`);
	response.status(500).json({ error: message });
};

export const okResponse = (response: Response, message: string) => {
	console.log(`Returning (200) Response. message: ${message}`);
	response.status(200).json({ message });
};

export const notFoundResponse = (
	response: Response,
	message: string = 'Not Found'
) => {
	console.warn(`Returning (404) Response. message: ${message}`);
	response.status(404).json({ error: message });
};

export const unauthorizedResponse = (
	response: Response,
	message: string = 'Unauthorized'
) => {
	console.error(`Returning (401) Response. message: ${message}`);
	response.status(401).json({ error: message });
};
