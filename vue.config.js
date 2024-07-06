const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Tracker',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // Configurações do workbox-plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // Opções do workbox
    }
  }
})
