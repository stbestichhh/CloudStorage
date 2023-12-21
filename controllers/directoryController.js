import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import CheckPath from '../utils/checkPath.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectoryPath = path.join(__dirname, '..', 'uploads');

export const CreateDirectory = () => {
  CheckPath(uploadDirectoryPath, () => fs.mkdir(uploadDirectoryPath, (err) => console.log(err)));
};

export default uploadDirectoryPath;
