const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('threes', resolve('src/threes'))
      .set('car', resolve('src/car'))
      .set('assets', resolve('src/assets'))
      .set('ui', resolve('src/ui'))
      .set('shaders', resolve('src/shaders'))

    // 卸载 vue-cli 自带的 glsl:file-loader
    config.module
      .rule('glsl')
      .test(/\.glsl$/)
      .use('glsl-shader-loader')
      .loader('glsl-shader-loader')
      .end()
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        THREE: 'three'
      })
    ]
  }
}
