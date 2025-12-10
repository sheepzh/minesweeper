import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import baseConfig from './rspack.config';

export default defineConfig({
  ...baseConfig,
  mode: 'development',
  devServer: {
    port: 8080,
    hot: true,
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new rspack.DefinePlugin({
      'window._IS_DEV_': JSON.stringify(true),
    }),
  ],
});
