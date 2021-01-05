const path = require('path');
const JsCss2JsonPlugin = require('./JsCss2JsonPlugin');
const resolve = (p) => path.resolve(p);

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    // 基本路径
    publicPath: isProd === "production" ? "./" : "/",
    // 输出文件目录
    outputDir: "dist",
    // 放置build生成的静态资源 (js、css、img、fonts) 的目录。
    assetsDir: "static",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: !isProd,
    productionSourceMap: !isProd,
    configureWebpack: {
        plugins: isProd ? [new JsCss2JsonPlugin(1)] : [],
        resolve: {
            alias: {
                '@': resolve('src'),
                '@assets': resolve('src/assets'),
                '@imgs': resolve('src/assets/imgs'),
                '@views': resolve('src/views'),
                '@comp': resolve('src/components'),
                '@tools': resolve('src/tools'),
                '@styles': resolve('src/styles'),
            }
        },

    },
    // css相关配置
    css: {
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "@styles/scale.scss";`
            }
        },
    },
    chainWebpack: config => {
        config.plugin('html')
            .tap(args => {
                // 定义html文件中需要用到的一些数据
                const htmlParams = {
                    production: true,
                    inject: isProd,
                };
                Object.assign(args[0], htmlParams);
                // 不注入js和css，调试模式需要注入
                args[0].inject = !isProd;
                return args;
            });
    },
}