// vue.config.js （纯前端专用版）
module.exports = {
    // 🌟 核心：部署后静态资源路径（关键！适配public文件夹）
    publicPath: './', // 必须写'./'，否则部署后会找不到public里的音频/歌词/图片

    // 打包输出目录（默认dist，不用改）
    outputDir: 'dist',
    // 静态资源子目录（public里的文件打包后会放到dist/static）
    assetsDir: 'static',
    // 生产环境关闭sourceMap（减小包体积，加速海外加载）
    productionSourceMap: false,
    // 🌟 可选：如果public里有大文件（比如音频），打包时不压缩
    configureWebpack: {
        optimization: {
            minimize: true // 保持true，只压缩代码，不影响静态文件
        }
    }
}