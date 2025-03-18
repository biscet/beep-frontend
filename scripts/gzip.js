const fs = require('node:fs');
const zlib = require('node:zlib');
const path = require('node:path');

const compressFile = (filePath) => {
  const fileContents = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(`${filePath}.gz`);
  const zip = zlib.createGzip();

  fileContents.pipe(zip).pipe(writeStream);
};

const compressImages = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      compressImages(filePath);
    } else {
      compressFile(filePath);
    }
  });
};
compressImages(`${__dirname}/../build`);