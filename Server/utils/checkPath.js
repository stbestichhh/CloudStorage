import fs from 'fs';

const CheckPath = async (path, cb) => {
  if (fs.access(path, (err) => (err ? 'Unexpected error while reading path.' : ''))) {
    await cb();
  }
};

export default CheckPath;
