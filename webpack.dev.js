const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development',
    allChunks: true,
});

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: { contentBase: './dist' },
    module: {
        rules: [{
            test: /\.(?:sass|scss)$/,
            use: extractSass.extract({
                use: [{ loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        query: { includePaths: [path.resolve(__dirname, 'node_modules')] },
                    },
                ], // use style-loader in development
                fallback: 'style-loader',
            }),
        }],
    },
    plugins: [extractSass],
});
