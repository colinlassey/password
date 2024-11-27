import fs from 'fs/promises';
import http from 'http';
import path from 'path';
import url from 'url';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        let filePath = path.join(__dirname, 'public', 'index.html');
        res.setHeader('Content-Type', 'text/html');
        res.write(await fs.readFile(filePath));
    } else {
        throw new Error('Server Error');
    }
});
