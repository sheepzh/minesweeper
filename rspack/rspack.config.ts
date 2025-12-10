import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import * as path from 'path';
import tsConfig from '../tsconfig.json';

const tsPathAlias = tsConfig.compilerOptions.paths;

// Process the alias of typescript modules
const resolveAlias: { [index: string]: string | false | string[] } = {};
const aliasPattern = /^(@.*)\/\*$/;

Object.entries(tsPathAlias).forEach(([alias, sourceArr]) => {
  // Only process the alias starts with '@'
  if (!aliasPattern.test(alias)) {
    return;
  }
  if (!sourceArr.length) {
    return;
  }
  const index = alias.match(aliasPattern)[1];
  const webpackSourceArr = sourceArr.map(folder =>
    path.resolve(__dirname, '..', folder.replace(/\/\*$/, ''))
  );
  resolveAlias[index] = webpackSourceArr;
});

console.log('Alias of typescript: ');
console.log(resolveAlias);

export default defineConfig({
  entry: {
    index: './src/view/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: resolveAlias,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    importSource: '@emotion/react',
                  },
                },
              },
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'builtin:lightningcss-loader',
            options: {
              targets: 'ie 10',
            },
          },
        ],
        type: 'css',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './src/view/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
  ],
  builtins: {
    emotion: true,
  },
});
