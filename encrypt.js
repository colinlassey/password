import crypto from 'crypto';

const INPUT = 'utf8';
const OUTPUT = 'hex';

let algorithm = 'aes-256-cbc';
let key = Buffer.from(process.env.KEY.trim(), OUTPUT);
let iv = Buffer.from(process.env.IV.trim(), OUTPUT);

const encrypt = async (user, pass) => {
    // console.log(user, pass);
    const cipherUser = crypto.createCipheriv(algorithm, key, iv);
    let encryptUser = cipherUser.update(user, INPUT, OUTPUT);
    encryptUser += cipherUser.final(OUTPUT);

    const cipherPass = crypto.createCipheriv(algorithm, key, iv);
    let encryptPass = cipherPass.update(pass, INPUT, OUTPUT);
    encryptPass += cipherPass.final(OUTPUT);

    return [ encryptUser, encryptPass ];
}

export default encrypt;
