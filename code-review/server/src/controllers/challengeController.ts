import { Request, Response } from 'express';
import { getSession, issueSession, WatermarkSession } from '../services/codeWatermark';

const VALID_PRIOR_FLAGS = [
	'flag{H0laB0la$$}',
	'flag{B0l@B0l@$$$$}',
	'flag{DimondHands2023}',
	'flag{$InfiniteMoneyGlitch$}',
];

const FINAL_FLAG = 'flag{C0d3R3v13wM4st3r}';
const SESSION_COOKIE = 'pp_review_session';

export const unlock = (req: Request, res: Response) => {
	const { flag } = req.body ?? {};
	if (typeof flag !== 'string' || !VALID_PRIOR_FLAGS.includes(flag)) {
		return res.status(401).json({ isSuccess: false, error: 'Invalid prior flag.' });
	}
	res.status(200).json({ isSuccess: true });
};

export const getCode = (req: Request, res: Response) => {
	let session: WatermarkSession | null = getSession(req.cookies?.[SESSION_COOKIE]);
	if (!session) {
		session = issueSession();
		res.cookie(SESSION_COOKIE, session.sessionId, {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 1000,
		});
	}
	res.status(200).json({
		isSuccess: true,
		code: session.code,
		lineCount: session.code.split('\n').length,
	});
};

interface SubmittedVuln {
	fromLine: unknown;
	toLine: unknown;
	type: unknown;
}

const isWithinRange = (range: { start: number; end: number }, from: number, to: number) =>
	Number.isInteger(from) &&
	Number.isInteger(to) &&
	from <= to &&
	from >= range.start &&
	to <= range.end;

export const check = (req: Request, res: Response) => {
	const session = getSession(req.cookies?.[SESSION_COOKIE]);
	if (!session) {
		return res.status(440).json({
			isSuccess: false,
			error: 'Your code-review session expired. Refresh the page to load a new copy.',
		});
	}

	const vuln = req.body?.vulnerability as SubmittedVuln | undefined;
	if (!vuln) {
		return res.status(400).json({ isSuccess: false, error: 'Missing vulnerability.' });
	}

	const from = Number(vuln.fromLine);
	const to = Number(vuln.toLine);
	const correct =
		(vuln.type === 'BOLA' && isWithinRange(session.bolaRange, from, to)) ||
		(vuln.type === 'BFLA' && isWithinRange(session.bflaRange, from, to));

	if (correct) {
		return res.status(200).json({ isSuccess: true });
	}
	return res.status(400).json({ isSuccess: false, error: 'Not quite.' });
};

export const submit = (req: Request, res: Response) => {
	const session = getSession(req.cookies?.[SESSION_COOKIE]);
	if (!session) {
		return res.status(440).json({
			isSuccess: false,
			error: 'Your code-review session expired. Refresh the page to load a new copy.',
		});
	}

	const { vulnerabilities } = req.body ?? {};
	if (!Array.isArray(vulnerabilities) || vulnerabilities.length !== 2) {
		return res.status(400).json({ isSuccess: false, error: 'Submit exactly 2 vulnerabilities.' });
	}

	const matchesBola = (v: SubmittedVuln) =>
		v.type === 'BOLA' &&
		isWithinRange(session.bolaRange, Number(v.fromLine), Number(v.toLine));
	const matchesBfla = (v: SubmittedVuln) =>
		v.type === 'BFLA' &&
		isWithinRange(session.bflaRange, Number(v.fromLine), Number(v.toLine));

	const hasBola = (vulnerabilities as SubmittedVuln[]).some(matchesBola);
	const hasBfla = (vulnerabilities as SubmittedVuln[]).some(matchesBfla);

	if (hasBola && hasBfla) {
		return res.status(200).json({ isSuccess: true, flag: FINAL_FLAG });
	}
	return res.status(400).json({
		isSuccess: false,
		error: 'Not quite.',
	});
};
