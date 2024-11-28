import fs from 'fs/promises';
import http from 'http';
import path from 'path';
import url from 'url';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let filePath;

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);
    if (req.method === 'GET' && req.url === '/') {
        filePath = path.join(__dirname, 'public', 'index.html');
    } else if (req.method === 'GET' && req.url === '/addLogin.html') {
        filePath = path.join(__dirname, 'public', 'addLogin.html');
    } else {
        throw new Error('Server Error');
    }
    const data = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'text/html');
    res.write(data);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
