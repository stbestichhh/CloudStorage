import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import CheckPath from '../utils/checkPath.js';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectoryPath = path.join(__dirname, '..', 'uploads');

export const CreateDirectory = () => {
  CheckPath(uploadDirectoryPath, () => fs.mkdir(uploadDirectoryPath, (err) => console.log(err)));
};

const storage = multer.diskStorage({
  destination: uploadDirectoryPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export { uploadDirectoryPath, upload };
