import express from 'express';
import fs from 'fs/promises';
import http from 'http';
import path from 'path';
import sqlite3 from 'sqlite3';
import url from 'url';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let filePath;
let sql;

const app = express();

// Create DB
export const db = new sqlite3.Database('./passwords.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// Create Table
if (!fs.access('./passwords.db', fs.constants.F_OK, (err) => {
    if (err) {
        sql = `PRAGMA foreign_keys = on;`;
        db.run(sql);

        sql = `CREATE TABLE userLogin(
            userId INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`;
        db.run(sql);

        sql = `CREATE TABLE userPasswords(
            userId INTEGER NOT NULL PRIMARY KEY,
            siteName TEXT NOT NULL,
            siteURL TEXT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            FOREIGN KEY (userID) REFERENCES userLogin(userId)
        )`;
        db.run(sql);
    } else {
        console.log(`Database already created...`);
    }
}));

// Setup static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
