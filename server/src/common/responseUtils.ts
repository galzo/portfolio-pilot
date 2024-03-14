import { Response } from 'express';

export const internalServerErrorResponse = (
	response: Response,
	message: string = 'Internal Server Error'
) => {
	response.status(500).json({ error: message });
};

export const okResponse = (response: Response, message: string) => {
	response.status(200).json({ message });
};

export const notFoundResponse = (
	response: Response,
	message: string = 'Not Found'
) => {
	response.status(404).json({ error: message });
};

export const unauthorizedResponse = (
	response: Response,
	message: string = 'Unauthorized'
) => {
	response.status(401).json({ error: message });
};
