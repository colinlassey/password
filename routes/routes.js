import decrypt from '../decrypt.js';
import encrypt from '../encrypt.js';
import express from 'express';
import sqlite3 from 'sqlite3';

let loggedIn = false;
let userId;
let data;
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

router.get('/isLoggedIn', (req, res) => {
    if (loggedIn) {
        res.status(200).json({ message: 'Logged in.' });        
    } else {
        res.status(401).json({ message: 'Please log in.' });
    }
});

router.post('/isLoggedIn', (req, res) => {
    if (loggedIn) {
        res.status(200).json({ message: 'Logged in.', credentials: data });
    } else {
        res.status(401).json({ message: 'Please log in.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    let encrypted = [];
    encrypted = await encrypt(username, password);

    db.get('SELECT * FROM userLogin WHERE username = ? AND password = ?', [encrypted[0], encrypted[1]], (err, row) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
            return 2;
        }

        if (row) {
            userId = row.userId;
            loggedIn = true;
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

router.post('/addLogin', async (req, res) => {
    const username = req.body.usernameSaved;
    const password = req.body.passwordSaved;

    let encrypted = [];
    encrypted = await encrypt(username, password);

    db.get('SELECT * FROM userLogin WHERE username = ? AND password = ?', [encrypted[0], encrypted[1]], (err, row) => {
        if (err) {
            console.log(err);
        }

        if (row) {
            res.status(401).json({ message: 'Login already exists' });
        } else {
            sql = 'INSERT INTO userLogin(username, password) VALUES (?,?)'; 
            db.run(sql, [encrypted[0], encrypted[1]], (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Database error', error: err.message });
                    return 2;
                } else {
                    res.status(200).json({ message: 'Login added' });
                }
            });
        }
    });
});

router.post('/suggestPassword', async (req, res) => {
    const params = req.body.params;
    const length = req.body.passwordLen;
    let suggestion = [];

    for (let i = 0; i < length; i++) {
        let choice = Math.floor(Math.random() * params.length);
        suggestion += params[choice];
    }

    res.status(200).json({ message: 'Success', password: suggestion });
});

router.post('/addCredentials', async (req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const user = req.body.username;
    const pass = req.body.password;

    let encrypted = [];
    encrypted = await encrypt(user, pass);

    db.get('SELECT * FROM userPasswords WHERE siteURL = ? AND username = ?', [url, encrypted[0]], (err, row) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
            return 2;
        }

        if (row) {
            res.status(401).json({ message: 'Login already exists' });
        } else {
            sql = 'INSERT INTO userPasswords(userId, siteName, siteURL, username, password) VALUES (?,?,?,?,?)';
            db.run(sql, [userId, name, url, encrypted[0], encrypted[1]], (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Database error', error: err.message });
                    return 2;
                } else {
                    res.status(200).json({ message: 'Success! Credentials added.' });
                }
            });
        }
    });
});

router.get('/getPasswords', (req, res) => {
    if (loggedIn) {
        sql = 'SELECT * FROM userPasswords WHERE userId = ?';
        db.all(sql, [userId], async (err, row) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Database error', error: err.message });
                return 2;
            } 

            if (row.length > 0) {
                for (let i = 0; i < row.length; i++) {
                    let decrypted = [];
                    decrypted = await decrypt(row[i].username, row[i].password);
                    row[i].username = decrypted[0];
                    row[i].password = decrypted[1];
                }

                res.status(200).json({ message: 'Response received.', credentials: row });
            } else {
                res.status(400).json({ message: 'No passwords have been saved.' });
            }
        });
    } else {
        res.status(401).json({ message: 'Please log in first.' });
    }
});

router.post('/editPasswords', (req, res) => {
    if (loggedIn) {
        data = req.body;
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(401).json({ message: 'Please log in first.' });
    }
});

router.post('/editCredentials', async (req, res) => {

});

export default router;
