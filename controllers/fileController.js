import fs from 'fs';
import { uploadDirectoryPath } from './directoryController.js';
import validateFileArray from '../validations/fileArray.js';
import path from 'path';
import CheckPath from '../utils/checkPath.js';

export const GetAllFiles = (req, res) => {
  fs.readdir(uploadDirectoryPath, (err, files) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(files);
  });
};

export const UploadFile = (req, res) => {
  if (!req.files || validateFileArray(req.files)) {
    return res.status(400).json('You have to uplopad a file.');
  }

  res.json('Files uploaded.');
};

export const DownloadFile = (req, res) => {
  const filepath = path.join(uploadDirectoryPath, req.params.filename);
  CheckPath(filepath, () => res.status(400).json('File not exists.'));

  res.status(200).download(filepath);
};

export const DeleteFile = (req, res) => {
  const filepath = path.join(uploadDirectoryPath, req.params.filename);
  CheckPath(filepath, () => res.status(400).json('File not exists.'));

  fs.unlink(filepath, (err) => {
    if (err) {
      return res.status(500).json('Unexprected error.');
    }
    res.status(200).json('File deleted.');
  });
};
