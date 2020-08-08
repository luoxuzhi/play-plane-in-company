const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
  },
  devtool: 'source-map',
  mode: 'production',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../image/', //可以重新生成图片到新的目录
              outputPath: 'image/',
            },
          },
        ],
      },
    ],
  },
}
