const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const definePlugin = new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') });
const uglifyJsPlugin = new UglifyJSPlugin();
const hashedModuleIdsPlugin = new webpack.HashedModuleIdsPlugin();

module.exports = merge(common, {
    plugins: [
        // uglifyJsPlugin,
        hashedModuleIdsPlugin,
        definePlugin,

    ],
});
