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

CREATE TABLE IF NOT EXISTS users (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS players (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	user_name VARCHAR(255) NOT NULL,
	email TEXT NOT NULL,
	created_date DATE NOT NULL,
	modified_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS runs (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	player_id UUID REFERENCES players(id),
	game_id UUID REFERENCES games(id),
	duration TEXT NOT NULL,
	video_link TEXT,
	run_date DATE NOT NULL,
	created_date DATE NOT NULL,
	modified_date DATE NOT NULL
);