const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  target: 'web',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
  },
  entry: {
    ui: './src/entrypoints/ui.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001,
    https: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
    extensions: ['.wasm', '.mjs', '.js', '.ts',],
    mainFiles: ['index'],
    fallback: {
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: false,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              url: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/ui/index.html',
      alwaysWriteToDisk: true,
    }),
    new VueLoaderPlugin(),
  ],
};
