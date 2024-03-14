export const createUserTableCmd = () =>
	'CREATE TABLE IF NOT EXISTS User (\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        name TEXT NOT NULL,\
        email TEXT UNIQUE NOT NULL,\
        password TEXT NOT NULL,\
        is_admin BOOLEAN DEFAULT 0,\
        CONSTRAINT email_unique UNIQUE (email))';

export const createStockTableCmd = () =>
	'CREATE TABLE IF NOT EXISTS Stock (\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        name TEXT NOT NULL,\
        ticker TEXT NOT NULL)';

export const createPortfolioTableCmd = () =>
	'CREATE TABLE IF NOT EXISTS Portfolio (\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        name TEXT NOT NULL,\
        cash DECIMAL NOT NULL,\
        user_id INTEGER,\
        FOREIGN KEY (user_id) REFERENCES User(id))';

export const createPortfolioStockTableCmd = () =>
	'CREATE TABLE IF NOT EXISTS PortfolioStock (\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        portfolio_id INTEGER,\
        stock_id INTEGER,\
        amount INTEGER NOT NULL,\
        FOREIGN KEY (portfolio_id) REFERENCES Portfolio(id),\
        FOREIGN KEY (stock_id) REFERENCES Stock(id))';

export const insertUserCmd = () =>
	`INSERT INTO User (name, email, password, is_admin) VALUES (?, ?, ?, ?)`;
