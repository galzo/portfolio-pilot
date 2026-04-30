import express from 'express';
import cors from 'cors';
import { setupDatabase } from './database/database';
import { leaderboardRouter } from './routes/leaderboardRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', leaderboardRouter);

const PORT = process.env.SERVER_PORT || 3002;

setupDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`listening on port ${PORT}`);
	});
});
