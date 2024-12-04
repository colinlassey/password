import crypto from 'crypto';

const INPUT = 'utf8';
const OUTPUT = 'hex';

let algorithm = 'aes-256-cbc';
let key = process.env.KEY;
let iv = process.env.IV;

export const encrypt = async (user, pass) => {
    const cipherUser = crypto.createCipheriv(algorithm, key, iv);
    let encryptUser = cipherUser.update(user, INPUT, OUTPUT);
    encryptUser += cipherUser.final(OUTPUT);

    const cipherPass = crypto.createCipheriv(algorithm, key, iv);
    let encryptPass = cipherPass.update(pass, INPUT, OUTPUT);
    encryptPass += cipherPass.final(OUTPUT);

    return [ encryptUser, encryptPass ];
}
