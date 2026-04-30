import { Request, Response } from 'express';

const VALID_FLAGS = [
	'flag{H0laB0la$$}',
	'flag{B0l@B0l@$$$$}',
	'flag{DimondHands2023}',
	'flag{$InfiniteMoneyGlitch$}',
];

export const unlock = (req: Request, res: Response) => {
	const { flag } = req.body;
	if (VALID_FLAGS.includes(flag)) {
		res.status(200).json({ isSuccess: true, message: 'Unlocked' });
	} else {
		res.status(401).json({ isSuccess: false, error: 'Invalid flag' });
	}
};

export const submit = (req: Request, res: Response) => {
	const { vulnerabilities } = req.body;
	// Expecting an array of 2 vulnerabilities: { fromLine, toLine, type }
	
	if (!vulnerabilities || vulnerabilities.length !== 2) {
		res.status(400).json({ isSuccess: false, error: 'You must submit exactly 2 vulnerabilities.' });
		return;
	}

	const hasBOLA = vulnerabilities.some((v: any) => v.type === 'BOLA' && v.fromLine >= 120 && v.toLine <= 140);
	const hasBFLA = vulnerabilities.some((v: any) => v.type === 'BFLA' && v.fromLine >= 210 && v.toLine <= 230);

	if (hasBOLA && hasBFLA) {
		res.status(200).json({ isSuccess: true, flag: 'flag{C0d3R3v13wM4st3r}' });
	} else {
		res.status(400).json({ isSuccess: false, error: 'Incorrect vulnerabilities found. Keep digging!' });
	}
};
