import crypto from 'crypto';
import fs from 'fs/promises';

const INPUT = 'utf8';
const OUTPUT = 'hex';

let algorithm = 'aes-256-cbc';
let key;
let iv;
let fileContents;

export const encrypt = async (user, pass) => {
    fileContents = await fs.readFile('./key.txt', INPUT)
        
    if (fileContents == '') {
        key = crypto.randomBytes(32);
        const keyHex = key.toString(OUTPUT);

        writeFile(keyHex, 0);
    } else {
        key = Buffer.from(fileContents.trim(), OUTPUT);
    }

    fileContents = '';

    fileContents = await fs.readFile('./iv.txt', INPUT)
    
    if (fileContents == '') {
        iv = crypto.randomBytes(16);
        const ivHex = iv.toString(OUTPUT);

        writeFile(ivHex, 1);
    } else {
        iv = Buffer.from(fileContents.trim(), OUTPUT);
    }

    const cipherUser = crypto.createCipheriv(algorithm, key, iv);
    let encryptUser = cipherUser.update(user, INPUT, OUTPUT);
    encryptUser += cipherUser.final(OUTPUT);

    const cipherPass = crypto.createCipheriv(algorithm, key, iv);
    let encryptPass = cipherPass.update(pass, INPUT, OUTPUT);
    encryptPass += cipherPass.final(OUTPUT);

    return [ encryptUser, encryptPass ];
}

const writeFile = async (data, dataType) => {
    try {
        if (dataType === 0) {
            console.log(data);
            await fs.writeFile('./key.txt', data);
            console.log('Key written to file');
        } else if (dataType === 1) {
            console.log(data);
            await fs.writeFile('./iv.txt', data);
            console.log('IV written to file');
        }
    } catch (error) {
        console.log(error);
    }
}
