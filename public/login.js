import { db } from "../app.js";
import { encrypt } from "../encrypt.js";

const USERNAME = document.querySelector('#username');
const PASSWORD = document.querySelector('#password');
const SUBMIT = document.querySelector('#submit');
const msg = document.querySelector('#msg');
let attempts = 0;

SUBMIT.onclick = submitFunc;

const submitFunc = () => {
    let i = 0;
    const username = USERNAME.value;
    const password = PASSWORD.value;

    let [encryptUser, encryptPass] = encrypt(username, password);
    // Does this work? If so, how does it return values, and how does it handle no values returned?
    // does it throw errors?
    sql = `SELECT * FROM userLogin WHERE username IS ${encryptUser} AND password IS ${encryptPass};`
    db.all(sql, [], (err, rows) => {
        if (err) {
            msg.style.visibility = 'inline';
            msg.innerHTML = `An error occurred. Please try again later.`;
            console.log(err);
            return 3;
        } else {
            rows.forEach((row) => {
                i++;           
            });
        }
        if (i === 1) {
            // somehow indicate success (with a route)

        } else if (i === 0) {
            msg.style.visibility = 'inline';
            msg.innerHTML = `Username or password is incorrect.`;
            attempts++;
        } else if (i > 1) {
            msg.style.visibility = 'inline';
            msg.innerHTML = `An error occurred. Please try again later.`;
            return 4;
        }
    });
};
