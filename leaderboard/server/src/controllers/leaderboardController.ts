import { Request, Response } from 'express';
import { getDb } from '../database/database';
import bcrypt from 'bcrypt';

const VALID_FLAGS = [
	'flag{H0laB0la$$}',
	'flag{B0l@B0l@$$$$}',
	'flag{DimondHands2023}',
	'flag{$InfiniteMoneyGlitch$}',
	'flag{C0d3R3v13wM4st3r}'
];

export const signup = async (req: Request, res: Response) => {
	const db = getDb();
	const { username, password } = req.body;
	
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
		res.status(200).json({ isSuccess: true, userId: result.lastID, username });
	} catch (error) {
		res.status(400).json({ isSuccess: false, error: 'Username already taken' });
	}
};

export const login = async (req: Request, res: Response) => {
	const db = getDb();
	const { username, password } = req.body;
	
	const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
	if (!user) return res.status(401).json({ isSuccess: false, error: 'Invalid credentials' });
	
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(401).json({ isSuccess: false, error: 'Invalid credentials' });
	
	res.status(200).json({ isSuccess: true, userId: user.id, username: user.username });
};

export const submitFlag = async (req: Request, res: Response) => {
	const db = getDb();
	const { userId, flag, captchaAnswer, captchaExpected } = req.body;

	if (parseInt(captchaAnswer) !== parseInt(captchaExpected)) {
		return res.status(400).json({ isSuccess: false, error: 'Incorrect CAPTCHA answer.' });
	}

	const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
	if (!user) return res.status(401).json({ isSuccess: false, error: 'User not found' });

	// Check if already submitted
	const alreadySubmitted = await db.get('SELECT * FROM submissions WHERE user_id = ? AND flag = ?', [userId, flag]);
	if (alreadySubmitted) return res.status(400).json({ isSuccess: false, error: 'Flag already submitted by you!' });

	if (VALID_FLAGS.includes(flag)) {
		// Calculate points
		const submissionsCountRes = await db.get('SELECT COUNT(*) as count FROM submissions WHERE flag = ?', [flag]);
		const count = submissionsCountRes.count;
		
		// 1st gets 100, drops by 5 per submission
		const points = Math.max(10, 100 - (count * 5));
		
		await db.run('INSERT INTO submissions (user_id, flag) VALUES (?, ?)', [userId, flag]);
		await db.run('UPDATE users SET score = score + ? WHERE id = ?', [points, userId]);
		
		res.status(200).json({ isSuccess: true, message: `Valid Flag! You earned ${points} points.` });
	} else {
		// Wrong flag penalty logic
		const newWrongAttempts = user.wrong_attempts + 1;
		let penalty = 0;
		if (newWrongAttempts > 3) {
			penalty = 1;
		}
		
		await db.run('UPDATE users SET wrong_attempts = ?, score = score - ? WHERE id = ?', [newWrongAttempts, penalty, userId]);
		res.status(400).json({ isSuccess: false, error: `Invalid flag. ${penalty > 0 ? 'You lost 1 point.' : 'You have ' + (3 - newWrongAttempts) + ' free wrong attempts left.'}` });
	}
};

export const getLeaderboard = async (req: Request, res: Response) => {
	const db = getDb();
	const users = await db.all('SELECT id, username, score FROM users ORDER BY score DESC LIMIT 50');
	res.status(200).json({ isSuccess: true, leaderboard: users });
};
