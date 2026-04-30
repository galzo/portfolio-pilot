import crypto from 'crypto';

interface CaptchaEntry {
	answer: number;
	expiresAt: number;
}

const TTL_MS = 5 * 60 * 1000;
const captchaStore = new Map<string, CaptchaEntry>();

const cleanupExpired = () => {
	const now = Date.now();
	for (const [id, entry] of captchaStore.entries()) {
		if (entry.expiresAt < now) captchaStore.delete(id);
	}
};

setInterval(cleanupExpired, 60 * 1000).unref?.();

const randInt = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

const buildPrompt = (): { prompt: string; answer: number } => {
	const operators: Array<'+' | '-' | '×'> = ['+', '-', '×'];
	const op = operators[randInt(0, operators.length - 1)];
	const a = randInt(2, 12);
	const b = randInt(2, 12);
	switch (op) {
		case '+':
			return { prompt: `What is ${a} + ${b}?`, answer: a + b };
		case '-': {
			const [hi, lo] = a >= b ? [a, b] : [b, a];
			return { prompt: `What is ${hi} − ${lo}?`, answer: hi - lo };
		}
		case '×':
			return { prompt: `What is ${a} × ${b}?`, answer: a * b };
	}
};

export const issueCaptcha = (): { captchaId: string; prompt: string } => {
	const { prompt, answer } = buildPrompt();
	const captchaId = crypto.randomBytes(16).toString('hex');
	captchaStore.set(captchaId, { answer, expiresAt: Date.now() + TTL_MS });
	return { captchaId, prompt };
};

export const consumeCaptcha = (captchaId: string, submittedAnswer: string): boolean => {
	if (!captchaId) return false;
	const entry = captchaStore.get(captchaId);
	if (!entry) return false;
	captchaStore.delete(captchaId);
	if (entry.expiresAt < Date.now()) return false;
	const parsed = parseInt(submittedAnswer, 10);
	if (Number.isNaN(parsed)) return false;
	return parsed === entry.answer;
};
