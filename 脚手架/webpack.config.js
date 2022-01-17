const path = require('path')
module.exports = {
    target: ['web', 'es5'],
    devtool: 'cheap-module-source-map',
    entry: './dist/index.js', // 这种配置打包后的JS文件会放在一个文件里
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },
    
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
            loader: 'babel-loader',
            options: {
              presets: [
                  ['babel-preset-env', {
                      targets: {
                          browser: ['> 1%']
                      }
                  }]
              ],
            }
          }
         }
       ]
     },
     mode: 'development'
  };