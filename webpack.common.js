const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const packageNpm = require('./package.json');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development',
    allChunks: true,
});

const vendorChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
// Specify the common bundle's name.
});

const manifestChunkPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' });

module.exports = {
    entry: {
        app: './src/app.js',
        // vendor: ['./node_modules/foundation-sites/dist/js/plugins/foundation.abide.js'],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Caching',
            template: './src/index.html',
        }),
        extractSass,
        // vendor musi być pierwszy
        vendorChunkPlugin,
        manifestChunkPlugin,
    ],

    output: {
        filename: '[name].[chunkhash].js',
        // chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: [
        'foundation-sites',
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                use: { loader: 'babel-loader' },
            },
            {
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
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: { alias: { Styles: path.resolve(__dirname, 'src/style/') } },
};
