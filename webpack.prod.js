const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development',
    allChunks: true,
});
const definePlugin = new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') });
const uglifyJsPlugin = new UglifyJSPlugin();
const hashedModuleIdsPlugin = new webpack.HashedModuleIdsPlugin();

module.exports = merge(common, {
    output: {
        filename: '[name].[chunkhash].js',
        // chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.(?:sass|scss)$/,
            use: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                    options: { minimize: true },
                },
                {
                    loader: 'sass-loader',
                    query: { includePaths: [path.resolve(__dirname, 'node_modules')] },
                },
                ], // use style-loader in development
                fallback: 'style-loader',
            }),
        }],
    },
    plugins: [
        uglifyJsPlugin,
        hashedModuleIdsPlugin,
        definePlugin,
        extractSass,

    ],
});
