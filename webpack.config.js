var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './client/index.jsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'dist/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};