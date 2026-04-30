import crypto from 'crypto';
import { CANONICAL_CODE } from '../data/vulnerableApp';

interface VulnRange {
	start: number;
	end: number;
}

export interface WatermarkSession {
	sessionId: string;
	code: string;
	bolaRange: VulnRange;
	bflaRange: VulnRange;
	expiresAt: number;
}

const SESSION_TTL_MS = 60 * 60 * 1000;
const sessions = new Map<string, WatermarkSession>();

setInterval(() => {
	const now = Date.now();
	for (const [id, s] of sessions.entries()) {
		if (s.expiresAt < now) sessions.delete(id);
	}
}, 60 * 1000).unref?.();

const PADDING_POOL = [
	'',
	'// TODO(@security): re-run static analysis after the q2 dependency bump.',
	'',
	'// NOTE: rewritten 2025-11 to support v2 portfolios. See ADR-0042.',
	'// Audit-trail: change-set #PP-4839 (Q1 platform hardening).',
	'',
	"// Reviewer: see playbook at internal-docs/portfoliopilot/api-conventions.",
	'// SECURITY-REVIEWED: handler relies on standard middleware chain.',
	'',
	'// Performance: under load this branch is hit ~3x as often as /portfolio.',
	"// We intentionally don't cache the response – staleness > 30s breaks the UI.",
	'// Telemetry: tag requests with x-pp-correlation-id for cross-service traces.',
	'',
	'// CHANGELOG (last 5 entries):',
	'//   2026-02-14  pp-bot         Audited by SecurityCo, signed off.',
	'//   2026-01-30  alice@pp.io    Bumped zod, tightened buy/sell schemas.',
	'//   2025-12-08  carol@pp.io    Switched audit log to async batching.',
	"//   2025-11-22  alice@pp.io    Removed legacy /v1/* aliases.",
	'//   2025-10-04  bob@pp.io      Wrapped redirect host in allow-list.',
	'',
	"// Don't add raw SQL here – use parameterizedQuery() so audits stay clean.",
	'// Open question: should we move requireAuth to a global app.use()?',
	'// Decision (2025-09-12): no, per-router opt-in is clearer for reviewers.',
	'',
	'// Lint: this block intentionally avoids early returns to keep traces flat.',
	'// Coverage: see __tests__/portfolio.spec.ts (98.2% branch coverage).',
	'// Note: the /portfolio/* family is the most-touched section of this file.',
	'',
	'// Migration note: these handlers expect schema migration 0184 or later.',
	'// Rollout: feature flag `pp.portfolio.v2` was retired 2026-01-12.',
	'// Reminder: keep this module under 500 LOC – split per-domain if it grows.',
];

const BOLA_START = '//::BOLA_START::';
const BOLA_END = '//::BOLA_END::';
const BFLA_START = '//::BFLA_START::';
const BFLA_END = '//::BFLA_END::';

interface RngState {
	value: number;
}

const seedRng = (seed: string): RngState => {
	const hash = crypto.createHash('sha256').update(seed).digest();
	const value = hash.readUInt32BE(0);
	return { value };
};

const nextInt = (state: RngState, min: number, max: number) => {
	state.value = (state.value * 1103515245 + 12345) >>> 0;
	const span = max - min + 1;
	return min + (state.value % span);
};

const buildPadding = (state: RngState, count: number): string[] => {
	const out: string[] = [];
	for (let i = 0; i < count; i += 1) {
		const idx = nextInt(state, 0, PADDING_POOL.length - 1);
		out.push(PADDING_POOL[idx]);
	}
	return out;
};

interface BlockSpan {
	startMarker: string;
	endMarker: string;
}

const findBlockLineRange = (lines: string[], span: BlockSpan): VulnRange => {
	let start = -1;
	let end = -1;
	for (let i = 0; i < lines.length; i += 1) {
		if (lines[i].trim() === span.startMarker) start = i;
		if (lines[i].trim() === span.endMarker) end = i;
	}
	if (start < 0 || end < 0) {
		throw new Error(`Sentinel ${span.startMarker} or ${span.endMarker} missing from canonical code`);
	}
	return { start, end };
};

export const buildWatermarkedCode = (sessionSeed: string) => {
	const rng = seedRng(sessionSeed);
	const lines = CANONICAL_CODE.split('\n');

	const bolaSrc = findBlockLineRange(lines, { startMarker: BOLA_START, endMarker: BOLA_END });
	const bflaSrc = findBlockLineRange(lines, { startMarker: BFLA_START, endMarker: BFLA_END });

	const bolaPaddingCount = nextInt(rng, 5, 25);
	const bflaPaddingCount = nextInt(rng, 5, 25);
	const intermissionPaddingCount = nextInt(rng, 3, 12);

	const bolaPadding = buildPadding(rng, bolaPaddingCount);
	const bflaPadding = buildPadding(rng, bflaPaddingCount);
	const intermissionPadding = buildPadding(rng, intermissionPaddingCount);

	const out: string[] = [];
	const expandedBola: VulnRange = { start: 0, end: 0 };
	const expandedBfla: VulnRange = { start: 0, end: 0 };

	const intermissionAt =
		bolaSrc.end + Math.floor((bflaSrc.start - bolaSrc.end) / 2);

	for (let i = 0; i < lines.length; i += 1) {
		if (i === bolaSrc.start) {
			for (const p of bolaPadding) out.push(p);
			expandedBola.start = out.length + 1;
			continue;
		}
		if (i === bolaSrc.end) {
			expandedBola.end = out.length;
			continue;
		}
		if (i === intermissionAt) {
			for (const p of intermissionPadding) out.push(p);
		}
		if (i === bflaSrc.start) {
			for (const p of bflaPadding) out.push(p);
			expandedBfla.start = out.length + 1;
			continue;
		}
		if (i === bflaSrc.end) {
			expandedBfla.end = out.length;
			continue;
		}
		out.push(lines[i]);
	}

	return {
		code: out.join('\n'),
		bolaRange: expandedBola,
		bflaRange: expandedBfla,
		lineCount: out.length,
	};
};

export const issueSession = (): WatermarkSession => {
	const sessionId = crypto.randomBytes(18).toString('hex');
	const built = buildWatermarkedCode(sessionId);
	const session: WatermarkSession = {
		sessionId,
		code: built.code,
		bolaRange: built.bolaRange,
		bflaRange: built.bflaRange,
		expiresAt: Date.now() + SESSION_TTL_MS,
	};
	sessions.set(sessionId, session);
	return session;
};

export const getSession = (sessionId: string | undefined): WatermarkSession | null => {
	if (!sessionId) return null;
	const session = sessions.get(sessionId);
	if (!session) return null;
	if (session.expiresAt < Date.now()) {
		sessions.delete(sessionId);
		return null;
	}
	return session;
};
