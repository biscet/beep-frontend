import { defineConfig } from '@farmfe/core';
import path from 'node:path';
import FarmfeEslintPlugin from 'vite-plugin-eslint';
import FarmfeStylelint from 'vite-plugin-stylelint';
import { getDefaultCopmilation, getFarmBuildPlugins, getFarmDefine } from './farm.utils';

const utilsCfg = { mode: 'dev' };

export default defineConfig(() => ({
  root: path.resolve(__dirname, '../'),
  compilation: {
    ...getDefaultCopmilation(utilsCfg),
    define: getFarmDefine(utilsCfg),
  },
  server: {
    hmr: true,
    open: true,
    port: 3000,
  },
  vitePlugins: [
    FarmfeEslintPlugin({
      fix: true,
      exclude: [
        path.resolve(__dirname, '../node_modules/**'),
      ],
    }),
    FarmfeStylelint({ fix: true }),
  ],
  plugins: getFarmBuildPlugins(utilsCfg),
}));