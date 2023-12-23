import fs from 'fs';
import { uploadDirectoryPath } from './directoryController.js';
import validateFileArray from '../validations/fileArray.js';
import path from 'path';
import CheckPath from '../utils/checkPath.js';

export const GetAllFiles = async (req, res) => {
  try {
    await fs.readdir(uploadDirectoryPath, (err, files) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Unexpected error.');
      }

      res.status(200).json(files);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json('Unexpected error.');
  }
};

export const UploadFile = async (req, res) => {
  try {
    if (validateFileArray(req.files)) {
      return res.status(400).json('You have to uplopad a file.');
    }

    res.status(201).json('Files uploaded.');
  } catch (err) {
    console.log(err);
    return res.status(500).json('Unexpected error.');
  }
};

export const DownloadFile = async (req, res) => {
  try {
    const filepath = path.join(uploadDirectoryPath, req.params.filename);
    CheckPath(filepath, () => res.status(400).json('File not exists.'));

    res.status(200).download(filepath);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Unexpected error.');
  }
};

export const DeleteFile = async (req, res) => {
  try {
    const filepath = path.join(uploadDirectoryPath, req.params.filename);
    CheckPath(filepath, () => res.status(400).json('File not exists.'));

    await fs.unlink(filepath, (err) => {
      if (err) {
        return res.status(500).json('Unexprected error.');
      }
      res.status(200).json('File deleted.');
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json('Unexpected error.');
  }
};
