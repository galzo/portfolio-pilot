import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { challengeRouter } from './routes/challengeRouter';

const app = express();

const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS ?? 'http://localhost:5174,http://localhost:5173').split(',');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
			return callback(new Error('Not allowed by CORS'));
		},
		credentials: true,
	})
);

app.use('/api/challenge', challengeRouter);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
