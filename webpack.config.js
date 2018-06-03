const path = require('path');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'), // path.resolve joins the current absolute path with where we want the bundle to be in
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [new NodemonPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    })],
    module: {
        rules: [{
            test: /\.js$/,  //looks for all the files and test if the files end in .js
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    mode: "none"
};