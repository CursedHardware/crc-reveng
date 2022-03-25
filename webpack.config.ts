import type { Configuration } from 'webpack'
import HTMLPlugin from 'html-webpack-plugin'

const configure: Configuration = {
  context: __dirname,
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      fs: false,
      crypto: false,
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve('ts-loader'),
      },
      {
        test: /.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')],
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    new HTMLPlugin({
      title: 'CRC RevEng',
    }),
  ],
}

export default configure
