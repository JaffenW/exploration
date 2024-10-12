const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: 'app',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new htmlWebpackPlugin({
            title: 'webpack测试',
            template: 'public/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        port: 8082
    }
}