CREATE TABLE Test(
	Id serial,
	Name text,
	ReleaseDate date
);

CREATE TABLE IF NOT EXISTS games (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	release_date SMALLINT NOT NULL,
	platform VARCHAR(255) NOT NULL
);
