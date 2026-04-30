import {
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Portfolio } from './portfolio';
import { Stock } from './stock';

@Entity()
export class PortfolioStock {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('integer')
	amount: number;

	@ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioStocks)
	portfolio: Portfolio;

	@ManyToOne(() => Stock, (stock) => stock.portfolioStocks)
	stock: Stock;
}
