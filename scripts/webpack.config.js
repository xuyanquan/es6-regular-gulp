

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var config =  {
    output: {
        filename: "views/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.html$/,loader: 'raw'},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ],
        rules: [
            {
                test: /\.js$/,
                exclude: /src/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'DEBUG': 'true'
        }),
        new HtmlWebpackPlugin({
            filename: './views/main.ftl',
            template: './WEB-INF/template/main.ftl'
        }),
        new CopyWebpackPlugin([
            { from: './WEB-INF/template/login.ftl', to: './views/'},
        ]),
        new webpack.ProvidePlugin({
            Regular: 'regularjs',
            RGUI: 'regular-ui',
            Component: path.join(__dirname, '../src/js/components'),
            Service: path.join(__dirname, '../src/js/service'),
            Util: path.join(__dirname, '../src/js/util')
        })

    ],
    'devtool':'source-map',
    'watch':true
};


module.exports = config;
