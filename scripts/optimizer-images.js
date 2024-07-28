const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('node:path');
const os = require('node:os');

const srcDir = path.join(__dirname, '../src');

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const tempPath = path.join(os.tmpdir(), path.basename(filePath));

  let sharpInstance = sharp(filePath);

  switch (ext) {
    case '.jpeg':
    case '.jpg': {
      sharpInstance = sharpInstance.jpeg({ quality: 80 }).metadata(() => void 0);
      break;
    }
    case '.png': {
      sharpInstance = sharpInstance.png({ quality: 90, compressionLevel: 9 }).metadata(() => void 0);
      break;
    }
    case '.webp': {
      sharpInstance = sharpInstance.webp({ quality: 80 }).metadata(() => void 0);
      break;
    }
    default: {
      throw new Error(`Unsupported file type: ${ext}`);
    }
  }

  await sharpInstance.toFile(tempPath);
  await fs.move(tempPath, filePath, { overwrite: true });
}

async function processDirectory(directory) {
  const items = await fs.readdir(directory);
  for (const item of items) {
    const fullPath = path.join(directory, item);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        await optimizeImage(fullPath);
        console.log(`Optimized: ${fullPath}`);
      }
    }
  }
}

(async () => {
  try {
    await processDirectory(srcDir);
    console.log('All images have been optimized.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
