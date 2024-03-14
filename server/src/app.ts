import { bootstrapDb } from './infrastructure/dbBuilder';
import 'reflect-metadata';
import { initializeDb } from './infrastructure/testFile';

console.log('hello world');

initializeDb();
