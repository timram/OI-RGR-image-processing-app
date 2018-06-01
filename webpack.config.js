const path = require('path');

module.exports = {
  entry: './app/app.jsx',
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [  //загрузчик для jsx
      {
        test: /\.jsx$/, // определяем тип файлов
        exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
        loader: 'babel-loader',   // определяем загрузчик
        // options: {
        //   presets: ['env', 'react']    // используемые плагины
        // },
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  }
};
