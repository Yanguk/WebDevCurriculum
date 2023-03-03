const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WasmModuleWebpackPlugin = require('wasm-module-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const PORT = 3000;
const MODE = process.env.NODE_ENV || 'development';
const isDevelopment = MODE === 'development';

module.exports = {
  mode: MODE,
  entry: './src/main.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                // WasmModuleWebpackPlugin.BabelPlugin,
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: ['file-loader'],
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]?[hash]',
        },
      },
      {
        test: /\.json$/i,
        type: 'asset/resource',
      },
      {
        test: /\.wasm$/,
        use: ['wasm-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    ...(isDevelopment ? [] : [new MiniCssExtractPlugin({ filename: '[name].css' })]),
    new WasmModuleWebpackPlugin.WebpackPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('./public/icon-256x256.png'),
          size: '256x256',
        },
      ],
    }),
  ],
  devServer: {
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: './public',
    },
    port: PORT,
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'], // 확장자 생략 가능한 목록 추가
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
