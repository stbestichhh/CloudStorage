/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import uploadDirectoryPath, { CreateDirectory } from './controllers/directoryController.js';
import { DeleteFile, DownloadFile, GetAllFiles, UploadFile } from './controllers/fileController.js';

const PORT = 3000;
const HOST = 'localhost';

const app = express();
app.use(cors());

CreateDirectory();

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

app.get('/files', GetAllFiles);
app.post('/upload', upload.array('files'), UploadFile);
app.get('/download/:filename', DownloadFile);
app.delete('/delete/:filename', DeleteFile);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT} on http://${HOST}:${PORT}`);
});
