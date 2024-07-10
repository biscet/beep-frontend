const autoPrefixer = require('autoprefixer');
const presetEnv = require('postcss-preset-env');
const willChange = require('postcss-will-change');

const autoPrefixerCfg = {
  overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
  grid: true,
  flexbox: 'no-2009',
  cascade: false,
  remove: true,
};

const willChangeCfg = {
  preserve: true,
  disableWarnings: false,
};

const presetEnvCfg = { stage: 2 };

module.exports = {
  plugins: [autoPrefixer(autoPrefixerCfg), willChange(willChangeCfg), presetEnv(presetEnvCfg)],
};
