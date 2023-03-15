-- Active: 1678861637915@@_@5432@postgres

CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
	name VARCHAR,
    email VARCHAR,
	phone VARCHAR,
	password VARCHAR,
	photo VARCHAR DEFAULT 'https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png',
	verif VARCHAR,
	otp VARCHAR
);

CREATE TABLE jobs (
    id VARCHAR PRIMARY KEY,
    type VARCHAR,
	url VARCHAR,
	company VARCHAR,
	company_url VARCHAR,
	location VARCHAR,
    title VARCHAR,
    description VARCHAR,
    how_to_apply VARCHAR,
	company_logo VARCHAR,
	created_at TIMESTAMP,
	updated_at TIMESTAMP
);

DROP TABLE jobs;
