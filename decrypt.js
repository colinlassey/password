import crypto from 'crypto';

const INPUT = 'hex';
const OUTPUT = 'utf8';
let algorithm = 'aes-256-cbc';
let key = Buffer.from(process.env.KEY.trim(), INPUT);
let iv = Buffer.from(process.env.IV.trim(), INPUT);

const decrypt = async (user, pass) => {
    const decipherUser = crypto.createDecipheriv(algorithm, key, iv);
    let decryptUser = decipherUser.update(user, INPUT, OUTPUT);
    decryptUser = decipherUser.final(OUTPUT);

    const decipherPass = crypto.createDecipheriv(algorithm, key, iv);
    let decryptPass = decipherPass.update(pass, INPUT, OUTPUT);
    decryptPass = decipherPass.final(OUTPUT);

    return [ decryptUser, decryptPass ];
}

export default decrypt;
