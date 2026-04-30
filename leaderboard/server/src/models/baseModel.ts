import { DataSource } from 'typeorm';

export abstract class BaseModel {
	protected db: DataSource;

	constructor(db: DataSource) {
		this.db = db;
	}
}
