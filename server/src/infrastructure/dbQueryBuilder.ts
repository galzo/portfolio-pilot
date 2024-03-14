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
	'CREATE TABLE Portfolio (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    name TEXT NOT NULL,\
    user_id INTEGER,\
    FOREIGN KEY (user_id) REFERENCES User(id))';
