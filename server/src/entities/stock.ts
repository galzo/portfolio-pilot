// Stock.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stock {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@Column('text')
	ticker: string;
}
