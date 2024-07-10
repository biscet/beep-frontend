import { defineConfig } from '@farmfe/core';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import FarmfeObfuscatorPlugin from 'rollup-plugin-javascript-obfuscator';
import FarmfeSitemap from 'vite-plugin-sitemap';
import { PAGES_PATH } from '../src/dict/path';
import { getDefaultCopmilation, getFarmBuildPlugins, getFarmDefine } from './farm.utils';

const utilsCfg = { mode: 'prod' };

const dynamicRoutes = Object.values(PAGES_PATH);

export default defineConfig(() => ({
  root: path.resolve(__dirname, '../'),
  compilation: {
    ...getDefaultCopmilation(utilsCfg),
    define: getFarmDefine(utilsCfg),
    partialBundling: {
      targetMinSize: 500 * 1024,
      immutableModules: ['node_modules'],
      targetMaxSize: 2000 * 1024,
      targetConcurrentRequests: 20,
      immutableModulesWeight: 1,
    },
    minify: {
      compress: true,
      mangle: true,
    },
    output: {
      targetEnv: 'browser-esnext',
      path: 'build',
      filename: 'assets/[name].[hash].[ext]',
      assetsFilename: 'static/[resourceName].[ext]',
      format: 'esm',
    },
    comments: false,
  },
  vitePlugins: [
    FarmfeSitemap({
      dynamicRoutes,
      outDir: 'build',
      generateRobotsTxt: false,
      hostname: process.env.FARM_SITEMAP_HOST,
    }),
    FarmfeObfuscatorPlugin({
      debugger: false,
      options: {
        debugProtection: false,
        controlFlowFlattening: true,
        disableConsoleOutput: true,
        optionsPreset: 'default',
        renameGlobals: true,
        target: 'browser',
        sourceMap: false,
        seed: uuidv4(),
      },
    }),
  ],
  plugins: getFarmBuildPlugins(utilsCfg),
}));