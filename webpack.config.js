const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const base = require('@bszhct/template-webpack/lib/base')
const pkg = require('./package.json')

// 开发环境
const isDev = process.env.NODE_ENV === 'development'
// 取到设置的组件名称
const [prefix, pkgName] = pkg.name.split('/')
// 组件名称, 转为首字母大写的形式
const library = pkgName
  .split('-')
  .map(n => n.toLowerCase().replace(/( |^)[a-z]/g, s => s.toUpperCase()))
  .join('')


module.exports = merge(base, {
  entry: {
    example: './example/index.tsx',
    [pkgName]: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    library,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  optimization: {
    splitChunks: false,
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: [path.join(__dirname, 'example'), path.join(__dirname, 'node_modules')],
    compress: true,
    inline: true,
    hot: true,
    port: 9002,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})

if (!isDev) {
  // 丢弃之前的入口配置
  module.exports.entry = ''
  // 合并生成环境的配置
  module.exports = merge(module.exports, {
    entry: {
      [`${pkgName}.min`]: ['./src/index.styl', './src/index.ts'],
    },
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${pkgName}.min.css`,
      }),
      new webpack.BannerPlugin(`
        ${pkgName} v${pkg.version}
        Copyright 2019-present bszhct.
        All rights reserved.
      `),
    ],
  })
}
