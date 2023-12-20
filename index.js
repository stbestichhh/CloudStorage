/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = 'localhost';

const app = express();
app.use(cors());

const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

app.get('/', (req, res) => {
  res.json({
    message: 'Status: 200 OK!',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT} on http://${HOST}:${PORT}`);
});
