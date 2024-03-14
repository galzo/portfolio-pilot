import sqlite3 from 'sqlite3';
import { DB_SOURCE } from './common/constants';

const db = new sqlite3.Database(DB_SOURCE, (err) => {});
