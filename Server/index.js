import express from 'express';
import cors from 'cors';
import {
  CreateDirectory,
  veiwsDirectory,
  upload,
  publicDirectory,
} from './controllers/directoryController.js';
import { DeleteFile, DownloadFile, GetAllFiles, UploadFile } from './controllers/fileController.js';

const PORT = 3000;
const HOST = 'localhost';

const app = express();
app.use(cors());
app.use(express.static(publicDirectory));

app.set('view engine', 'ejs');
app.set('views', veiwsDirectory);

CreateDirectory();

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/files', GetAllFiles);
app.post('/upload', upload.array('files'), UploadFile);
app.get('/download/:filename', DownloadFile);
app.delete('/delete/:filename', DeleteFile);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT} on http://${HOST}:${PORT}`);
});
