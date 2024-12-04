import express from 'express';
import path from 'path';
import router from './routes/routes.js';
import url from 'url';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use('/api', router);

// Setup static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
