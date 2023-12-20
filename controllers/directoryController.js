import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectoryPath = path.join(__dirname, '..', 'uploads');

export const CreateDirectory = () => {
  if (!fs.existsSync(uploadDirectoryPath)) {
    fs.mkdir(uploadDirectoryPath, (err) => console.log(err));
  }
};

export default uploadDirectoryPath;
