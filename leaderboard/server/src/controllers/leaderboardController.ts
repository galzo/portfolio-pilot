import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getDb } from '../database/database';
import { consumeCaptcha, issueCaptcha } from '../services/captchaService';

const VALID_FLAGS = [
	'flag{H0laB0la$$}',
	'flag{B0l@B0l@$$$$}',
	'flag{DimondHands2023}',
	'flag{$InfiniteMoneyGlitch$}',
	'flag{C0d3R3v13wM4st3r}',
];

export const signup = async (req: Request, res: Response) => {
	const db = getDb();
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ isSuccess: false, error: 'Username and password are required.' });
	}

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

export const getCaptcha = (_req: Request, res: Response) => {
	const captcha = issueCaptcha();
	res.status(200).json({ isSuccess: true, ...captcha });
};

export const submitFlag = async (req: Request, res: Response) => {
	const db = getDb();
	const { userId, flag, captchaId, captchaAnswer } = req.body;

	if (!consumeCaptcha(captchaId, captchaAnswer)) {
		return res.status(400).json({ isSuccess: false, error: 'Captcha failed. Try the new one.' });
	}

	const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
	if (!user) return res.status(401).json({ isSuccess: false, error: 'User not found' });

	const alreadySubmitted = await db.get('SELECT * FROM submissions WHERE user_id = ? AND flag = ?', [userId, flag]);
	if (alreadySubmitted) return res.status(400).json({ isSuccess: false, error: 'You already submitted this flag.' });

	if (VALID_FLAGS.includes(flag)) {
		const submissionsCountRes = await db.get('SELECT COUNT(*) as count FROM submissions WHERE flag = ?', [flag]);
		const count = submissionsCountRes.count;
		const points = Math.max(10, 100 - count * 5);

		await db.run('INSERT INTO submissions (user_id, flag) VALUES (?, ?)', [userId, flag]);
		await db.run('UPDATE users SET score = score + ? WHERE id = ?', [points, userId]);

		return res.status(200).json({ isSuccess: true, message: `Valid flag! You earned ${points} points.` });
	}

	const newWrongAttempts = user.wrong_attempts + 1;
	const penalty = newWrongAttempts > 3 ? 1 : 0;
	await db.run('UPDATE users SET wrong_attempts = ?, score = score - ? WHERE id = ?', [
		newWrongAttempts,
		penalty,
		userId,
	]);

	const tail = penalty > 0 ? 'You lost 1 point.' : `You have ${3 - newWrongAttempts} free wrong attempts left.`;
	res.status(400).json({ isSuccess: false, error: `Invalid flag. ${tail}` });
};

export const getLeaderboard = async (req: Request, res: Response) => {
	const db = getDb();
	const users = await db.all('SELECT id, username, score FROM users ORDER BY score DESC, id ASC LIMIT 50');

	const userIdRaw = req.query.userId;
	const userId = typeof userIdRaw === 'string' ? parseInt(userIdRaw, 10) : NaN;

	let me: object | null = null;
	if (!Number.isNaN(userId)) {
		const meRow = await db.get('SELECT id, username, score, wrong_attempts FROM users WHERE id = ?', [userId]);
		if (meRow) {
			const rankRow = await db.get(
				'SELECT COUNT(*) + 1 AS rank FROM users WHERE score > ? OR (score = ? AND id < ?)',
				[meRow.score, meRow.score, meRow.id]
			);
			const flagsRow = await db.get('SELECT COUNT(*) AS solved FROM submissions WHERE user_id = ?', [userId]);
			me = {
				rank: rankRow?.rank ?? null,
				score: meRow.score,
				wrongAttempts: meRow.wrong_attempts,
				flagsSolved: flagsRow?.solved ?? 0,
			};
		}
	}

	res.status(200).json({ isSuccess: true, leaderboard: users, me });
};
