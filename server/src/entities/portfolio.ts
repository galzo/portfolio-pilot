// Portfolio.ts
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { User } from './user';
import { PortfolioStock } from './portfolioStock';

@Entity()
export class Portfolio {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@ManyToOne(() => User, (user) => user.portfolios)
	user: User;

	@Column('decimal')
	cash: number;

	@OneToMany(() => PortfolioStock, (portfolioStock) => portfolioStock.portfolio)
	stocks: PortfolioStock[];
}
