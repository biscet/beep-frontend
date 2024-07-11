const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolderRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });

    fs.rmdirSync(folderPath);

    console.log(`Папка ${folderPath} удалена.`);
  } else {
    console.log(`Папка ${folderPath} не найдена.`);
  }
}

const folderToDelete = './config/node_modules';

deleteFolderRecursive(folderToDelete);