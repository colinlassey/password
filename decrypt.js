import crypto from 'crypto';

const INPUT = 'hex';
const OUTPUT = 'utf8';

let algorithm = 'aes-256-cbc';
let key = process.env.KEY;
let iv = process.env.IV;

export const decrypt = async (user, pass) => {
    const decipherUser = crypto.createDecipheriv(algorithm, key, iv);
    let decryptUser = decipherUser.update(bufferUser, INPUT, OUTPUT);
    decryptUser = decipherUser.final(OUTPUT);

    const decipherPass = crypto.createDecipheriv(algorithm, key, iv);
    let decryptPass = decipherPass.update(bufferPass, INPUT, OUTPUT);
    decryptPass = decipherPass.final(OUTPUT);

    return [ decryptUser, decryptPass ];
}
