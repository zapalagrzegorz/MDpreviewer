const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const packageNpm = require('./package.json');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development',
    allChunks: true,
});

// const vendorChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
//     name: 'vendor',
//     // Specify the common bundle's name.
// });


// const manifestChunkPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' });

module.exports = {
    entry: {
        app: './src/app.js',
        // vendor: ['./node_modules/foundation-sites/dist/js/plugins/foundation.abide.js'],
    },
    // skopiowane z https://gist.github.com/gricard/e8057f7de1029f9036a990af95c62ba8
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Caching',
            template: './src/index.html',
        }),
        extractSass,
        // vendor musi być pierwszy
        // vendorChunkPlugin,
        // manifestChunkPlugin,
    ],


    externals: [
        'foundation-sites',
        // 'highlight.js',
    ],
    module: {
        rules: [
            // babel
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'src'),
                use: { loader: 'babel-loader' },
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
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: { Styles: path.resolve(__dirname, 'src/style/') },
    },
};
