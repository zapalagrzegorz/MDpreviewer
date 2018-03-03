const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

const extractSass = new ExtractTextPlugin({
    filename: 'styles.css',
    disable: process.env.NODE_ENV === 'development',
    allChunks: true,
});

module.exports = merge(common, {
    output: {
        filename: '[name].[hash].js',
        // chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(?:css|sass|scss)$/,
                use: ['css-hot-loader'].concat(extractSass.extract({
                    use: [{
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        query: {
                            includePaths: [path.resolve(__dirname, 'node_modules')],
                        },
                    },
                    ], // use style-loader in development
                    fallback: 'style-loader',
                })),
            }],
    },
    plugins: [
        extractSass,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
});
