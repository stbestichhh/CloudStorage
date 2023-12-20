/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import CheckPath from './utils/checkPath.js';
import validateFileArray from './validations/fileArray.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = 'localhost';

const app = express();
app.use(cors());

const uploadDirectoryPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectoryPath)) {
  fs.mkdir(uploadDirectoryPath, (err) => console.error(err));
}

const storage = multer.diskStorage({
  destination: uploadDirectoryPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.json({
    message: 'Status: 200 OK!',
  });
});

app.get('/files', (req, res) => {
  fs.readdir(uploadDirectoryPath, (err, files) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(files);
  });
});

app.post('/upload', upload.array('files'), (req, res) => {
  if (!req.files || validateFileArray(req.files)) {
    return res.status(400).json('You have to uplopad a file.');
  }

  res.json('Files uploaded.');
});

app.get('/download/:filename', (req, res) => {
  const filepath = path.join(uploadDirectoryPath, req.params.filename);
  CheckPath(filepath, () => res.status(400).json('File not exists.'));

  res.status(200).download(filepath);
});

app.delete('/delete/:filename', (req, res) => {
  const filepath = path.join(uploadDirectoryPath, req.params.filename);
  CheckPath(filepath, () => res.status(400).json('File not exists.'));

  fs.unlink(filepath, (err) => {
    if (err) {
      return res.status(500).json('Unexprected error.');
    }
    res.status(200).json('File deleted.');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT} on http://${HOST}:${PORT}`);
});
