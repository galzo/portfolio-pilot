import { Response } from 'express';

export const internalServerErrorResponse = (
	response: Response,
	message: string = 'Internal Server Error'
) => {
	console.error(`Returning (500) response. message: ${message}`);
	response.status(500).json({ error: message });
};

export const okResponse = (response: Response, payload: unknown) => {
	console.log(`Returning (200) Response`);
	response.status(200).json(payload);
};

export const conflictResponse = (
	response: Response,
	message: string = 'Conflict'
) => {
	console.warn(`Returning (409) Response. message: ${message}`);
	response.status(409).json({ error: message });
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
