import fs from 'fs';

const CheckPath = (path, cb) => {
  if (!fs.existsSync(path)) {
    cb();
  }
};

export default CheckPath;
