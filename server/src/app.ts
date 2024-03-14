import 'reflect-metadata';
import { bootstrapDb } from './infrastructure/dbInitializer';

console.log('hello world');

const runServer = async () => {
	const db = await bootstrapDb();
};

runServer();
