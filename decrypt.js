import crypto from 'crypto';
import fs from 'fs/promises';

const INPUT = 'hex';
const OUTPUT = 'utf8';

let algorithm = 'aes-256-cbc';
let key;
let iv;
let fileContents;

export const decrypt = async (user, pass) => {
    let bufferUser = Buffer.from(user, INPUT);
    let bufferPass = Buffer.from(pass, INPUT);

    fileContents = await fs.readFile('./key.txt', OUTPUT);
    key = Buffer.from(fileContents.trim(), INPUT);

    fileContents = await fs.readFile('./iv.txt', OUTPUT);
    iv = Buffer.from(fileContents.trim(), INPUT);

    const decipherUser = crypto.createDecipheriv(algorithm, key, iv);
    let decryptUser = decipherUser.update(bufferUser, INPUT, OUTPUT);
    decryptUser = decipherUser.final(OUTPUT);

    const decipherPass = crypto.createDecipheriv(algorithm, key, iv);
    let decryptPass = decipherPass.update(bufferPass, INPUT, OUTPUT);
    decryptPass = decipherPass.final(OUTPUT);

    return [ decryptUser, decryptPass ];
}
