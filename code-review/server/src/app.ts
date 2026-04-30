import express from 'express';
import cors from 'cors';
import { challengeRouter } from './routes/challengeRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/challenge', challengeRouter);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
