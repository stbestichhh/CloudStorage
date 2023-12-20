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

const uploadDirectoryPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectoryPath)) {
  fs.mkdirSync(uploadDirectoryPath);
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
      res.status(500).json({
        message: err,
      });
    }

    res.status(200).json(files);
  });
});

app.post('/upload', upload.array('files'), (req, res) => {
  if (!res.files || req.files.length === 0) {
    res.status(400).json('You have to uplopad a file.');
  }

  res.json('Files uploaded.');
});

app.get('/download/:filename', (req, res) => {
  const filepath = path.join(uploadDirectoryPath, req.params.filename);
  res.status(200).download(filepath);
});

app.delete('/delete/:filename', (req, res) => {
  const filepath = path.join(uploadDirectoryPath, req.params.filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      res.status(500).json('Unexprected error.');
    }
    res.status(200).json('File deleted.');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT} on http://${HOST}:${PORT}`);
});
