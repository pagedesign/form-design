const packez = require('packez');
const path = require('path');

packez.build({
    index: './demo/index.js',
}, 'dist', {
        publicPath: './',
        assest: {
            css: {
                output: "css",
            },
            js: {
                output: "js",
            },
            media: {
                output: 'media',
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src'),
                'datax': path.resolve(__dirname, '../src/datax'),
                'nexui': path.resolve(__dirname, '../src/nexui-react'),
            }
        },
        loaders: {
            scss: true,
            eslint: {
                rules: {
                    "react/jsx-no-undef": 1
                }
            },
            babel: {
                plugins: [
                    ["import", { "libraryName": "antd", "style": "css" }],
                    // ["import", { "libraryName": "antd", "style": "css" }, "antd"],
                    //["import", { "libraryName": "antd-mobile", "style": "css" }, "antd-mobile"]
                ]
            }
        },
        devServer: {
            proxy: {
                '/cobweb': {
                    target: 'http://192.168.120.61:9988',
                    secure: false,
                    changeOrigin: true,
                    // headers: {
                    //     Connection: 'keep-alive'
                    // }
                }
            }
        }
    });
