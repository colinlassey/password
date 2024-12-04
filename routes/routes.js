import encrypt from '../encrypt.js';
import express from 'express';
import sqlite3 from 'sqlite3';

let sql;

const router = express.Router();

const db = new sqlite3.Database('./passwords.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

sql = `PRAGMA foreign_keys = on;`;
db.run(sql);

sql = `CREATE TABLE IF NOT EXISTS userLogin(
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`;
db.run(sql);

sql = `CREATE TABLE IF NOT EXISTS userPasswords(
    userId INTEGER NOT NULL PRIMARY KEY,
    siteName TEXT NOT NULL,
    siteURL TEXT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    FOREIGN KEY (userID) REFERENCES userLogin(userId)
)`;
db.run(sql);

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const [ encryptUser, encryptPass ] = encrypt(username, password);

    db.get('SELECT * FROM userLogin WHERE username = ? AND password = ?', [encryptUser, encryptPass], (err, row) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
            return 2;
        }

        if (row) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

router.post('/addLogin', (req, res) => {
    const { username, password } = req.body;

    const [ encryptUser, encryptPass ] = encrypt(username, password);

    sql = 'INSERT INTO userLogin(username, password) VALUES (?,?)'; 
    db.run(sql, [encryptUser, encryptPass], (err) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
            return 2;
        } else {
            res.status(200).json({ message: 'Login added' });
        }
    });
});

export default router;
