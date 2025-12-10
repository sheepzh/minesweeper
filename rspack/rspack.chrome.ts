import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import * as path from 'path';
import * as fs from 'fs';
import baseConfig from './rspack.config';
import manifest from '../src/extension/manifest';
import i18nChrome from '../src/i18n/chrome';
import packageInfo from '../package.json';

const { name, version } = packageInfo;

const outputPath = path.resolve(__dirname, '..', 'dist_mv3');
const marketPkgPath = path.resolve(__dirname, '..', 'market_packages');

// Custom plugin to write JSON files
class WriteJsonPlugin {
  name = 'WriteJsonPlugin';
  
  apply(compiler: any) {
    compiler.hooks.afterEmit.tap(this.name, () => {
      // Write manifest.json
      const manifestPath = path.join(outputPath, 'manifest.json');
      fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      
      // Write locale files
      Object.entries(i18nChrome).forEach(([locale, message]) => {
        const localePath = path.join(outputPath, `_locales/${locale}/messages.json`);
        fs.mkdirSync(path.dirname(localePath), { recursive: true });
        fs.writeFileSync(localePath, JSON.stringify(message, null, 2));
      });
    });
  }
}

export default defineConfig({
  ...baseConfig,
  mode: 'production',
  entry: {
    index: './src/view/index.tsx',
    'service-worker': './src/extension/service-worker/index.ts',
  },
  output: {
    filename: '[name].js',
    path: outputPath,
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '..', 'asset'),
          to: path.join(outputPath, 'asset'),
        },
      ],
    }),
    new WriteJsonPlugin(),
  ],
});
