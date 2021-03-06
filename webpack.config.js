const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        entry: [
            "babel-polyfill",
            path.join(__dirname, './src/index.js')
        ],
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            port: 3000, //端口号
        },
        module: {
            rules: [{
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.less$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'less-loader',
                    ]
                },

                {
                    test: /\.(png|jpg|gif|jpeg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            esModule: false, // 这里设置为false
                            name: 'images/[name]-[hash:5].[ext]',
                            limit: 10240
                        }
                    }, 
                 {
                     loader: 'image-webpack-loader', // 压缩图片
                     options: {
                         bypassOnDebug: true,
                     }
                 }]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebPackPlugin({
                template: "./public/index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "[name]-[hash:5].css",
                chunkFilename: "[id]-[hash:5].css"
            })
        ]
    }
};