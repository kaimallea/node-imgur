const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const generalConfig = {
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

const nodeConfig = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'imgur.node.js',
    libraryTarget: 'umd',
  },
};

const browserConfig = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'imgur.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true,
    library: 'imgur',
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    generalConfig.devtool = 'cheap-module-source-map';
  } else if (argv.mode === 'production') {
  } else {
    throw new Error('Specify env');
  }

  Object.assign(nodeConfig, generalConfig);
  Object.assign(browserConfig, generalConfig);

  return [nodeConfig, browserConfig];
};
