const fs = require('node:fs');
const path = require('node:path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { v4: uuidv4 } = require('uuid');

const obfuscateFile = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    debugProtection: false,
    controlFlowFlattening: true,
    disableConsoleOutput: true,
    optionsPreset: 'low-obfuscation',
    compact: true,
    renameGlobals: false,
    target: 'browser',
    seed: uuidv4(),
    controlFlowFlatteningThreshold: 0.2,
    stringArrayShuffle: false,
    stringArray: false,
    splitStrings: false,
    stringArrayThreshold: 0,
  });

  fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
};

const obfuscateDirectory = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      obfuscateDirectory(filePath);
    } else if (filePath.endsWith('.js')) {
      obfuscateFile(filePath);
    }
  });
};

const buildDir = path.join(__dirname, '../build/assets');

obfuscateDirectory(buildDir);