// import sqlite3 from 'sqlite3';
// import { DB_SOURCE } from '../common/constants';

// export class AppDatabase {
// 	private db: sqlite3.Database;

// 	constructor() {
// 		this.db = new sqlite3.Database(DB_SOURCE);
// 	}

// 	serialize = (callback: () => void) => {
// 		this.db.serialize(callback);
// 	};

// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	runQuery = async (query: string, params?: any) =>
// 		new Promise<void>((resolve, reject) => {
// 			this.db.run(query, params, (error) => {
// 				if (error) {
// 					reject(error);
// 				} else {
// 					resolve();
// 				}
// 			});
// 		});

// 	close = () => {
// 		this.db.close();
// 	};
// }
