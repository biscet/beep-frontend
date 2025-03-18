import { defineConfig } from '@farmfe/core';
import path from 'node:path';
import FarmfeSitemap from 'vite-plugin-sitemap';
import { getDefaultCopmilation, getFarmBuildPlugins, getFarmDefine } from './farm.utils';
import { dynamicRoutes, robots } from './farm.sitemap';

const utilsCfg = { mode: 'prod' };

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
      generateRobotsTxt: true,
      readable: false,
      hostname: process.env.FARM_SITEMAP_HOST,
      robots,
      changefreq: 'weekly',
    }),
  ],
  plugins: getFarmBuildPlugins(utilsCfg),
}));