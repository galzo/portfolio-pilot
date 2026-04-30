import express from 'express';
import { getAllStocks } from '../controllers/stockController';

const stockRouter = express.Router();
stockRouter.get('/all', getAllStocks);

export { stockRouter };
