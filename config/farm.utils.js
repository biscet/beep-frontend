import path from 'node:path';
import FarmfePostcssPlugin from '@farmfe/js-plugin-postcss';
import FarmfeScssPlugin from '@farmfe/js-plugin-sass';

export const getFarmBuildPlugins = ({ mode }) => [
  FarmfeScssPlugin(),
  FarmfePostcssPlugin({
    postcssLoadConfig: {
      path: path.resolve(__dirname, '../postcss.config.js'),
    },
  }),
  [
    '@farmfe/plugin-react',
    {
      refresh: mode === 'dev',
      development: mode === 'dev',
      runtime: 'classic',
    },
  ],
];

export const getFarmDefine = ({ mode }) => ({
  'process.env.NODE_ENV': JSON.stringify(mode),
});

export const getDefaultCopmilation = () => ({
  input: {
    index: path.resolve(__dirname, '../index.html'),
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
  },
  persistentCache: false,
  treeShaking: false,
  sourcemap: false,
  script: {
    target: 'esnext',
  },
});