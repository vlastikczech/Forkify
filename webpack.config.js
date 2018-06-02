const path = require('path');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // path.resolve joins the current absolute path with where we want the bundle to be in
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [new NodemonPlugin()],
    mode: "none"
};