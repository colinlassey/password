import fs from 'fs/promises';
import { encrypt } from '../encrypt.js';
import { decrypt } from '../decrypt.js';

const USERNAME = document.querySelector('#username');
const PASSWORD = document.querySelector('#password');
const SUBMIT = document.querySelector('#submit');
const MSG = document.querySelector('#msg');

SUBMIT.onclick = submitFunc;

const submitFunc = () => {
    const usernameSaved = USERNAME.value;
    const passwordSaved = PASSWORD.value;

    try {
        let [encryptUser, encryptPass] = encrypt(usernameSaved, passwordSaved);
        fs.appendFile('./logins.csv', `\n${encryptUser}, ${encryptPass}`);
        MSG.style.visibility = 'inline';
        MSG.innerHTML = 'Login added successfully!';
        console.log('Login added.');
    } catch(err) {
        console.log(err);
        MSG.style.visibility = 'inline';
        MSG.innerHTML = `An error occurred. Please try again later.`;
        return 2;
    }
}
