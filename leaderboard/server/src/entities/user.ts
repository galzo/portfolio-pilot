// User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Portfolio } from './portfolio';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ default: false })
	isAdmin: boolean;

	@OneToMany(() => Portfolio, (portfolio) => portfolio.user)
	portfolios: Portfolio[];
}
