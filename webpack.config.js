const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'), // path.resolve joins the current absolute path with where we want the bundle to be in
        filename: 'bundle.js'
    }
};