

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


var config =  {
    output: {
        filename: "ftl/bundle-[hash].js"
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
            'DEBUG': 'false'
        }),
        new HtmlWebpackPlugin({
            filename: './ftl/main.ftl',
            template: './WEB-INF/template/main.ftl'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            { from: './WEB-INF/template/login.ftl', to: './ftl/'},
        ]),
        new webpack.ProvidePlugin({
            Regular: 'regularjs',
            RGUI: 'regular-ui',
            Component: path.join(__dirname, '../src/js/components/index'),
            Service: path.join(__dirname, '../src/js/service'),
            Util: path.join(__dirname, '../src/js/util')
        })

    ],
    'devtool':'source-map',
    'watch':true
};



module.exports = config;
