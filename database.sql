CREATE DATABASE password;

CREATE TABLE userLogin(
    userId SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE userPasswords(
    userId PRIMARY KEY REFERENCES userLogin(userId),
    siteName VARCHAR(255)
    siteURL VARCHAR(255)
    username VARCHAR(255)
    password VARCHAR(255)
);
