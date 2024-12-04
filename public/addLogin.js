import { db } from '../app.js';
import { encrypt } from '../encrypt.js';

const USERNAME = document.querySelector('#username');
const PASSWORD = document.querySelector('#password');
const SUBMIT = document.querySelector('#submit');
const MSG = document.querySelector('#msg');
let sql;

SUBMIT.onclick = submitFunc;

const submitFunc = () => {
    const usernameSaved = USERNAME.value;
    const passwordSaved = PASSWORD.value;

    try {
        let [encryptUser, encryptPass] = encrypt(usernameSaved, passwordSaved);
        sql = `INSERT INTO userLogin(username, password) VALUES (?,?)`;
        db.run(sql, [encryptUser, encryptPass], (err) => {
            if (err) {
                MSG.innerHTML = `An error occurred. Please try again later.`;
                console.error(err.message);
                return 2;
            }
        });
        MSG.style.visibility = 'inline';
        MSG.innerHTML = 'Login added successfully!';
        console.log('Login added.');
    } catch(err) {
        console.log(err);
        MSG.style.visibility = 'inline';
        MSG.innerHTML = `An error occurred. Please try again later.`;
        return 3;
    }
}
