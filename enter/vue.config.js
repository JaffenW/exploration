const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: '8082',
    proxy: 'http://127.0.0.1:3000',
  }
})
