import fs from 'fs';

const CheckPath = (path, cb) => {
  if (!fs.exists(path, (e) => console.log(!e ? 'Not Found' : ''))) {
    cb();
  }
};

export default CheckPath;
