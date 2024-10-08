// Stock.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PortfolioStock } from './portfolioStock';

@Entity()
export class Stock {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@Column('text')
	ticker: string;

	@Column('decimal')
	price: number;

	@OneToMany(() => PortfolioStock, (portfolioStock) => portfolioStock.stock)
	portfolioStocks: PortfolioStock[];
}
