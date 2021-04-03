const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    // First, let's define an entry point for webpack to start its crawling.
    entry: './src/index.jsx',
    // Second, we define where the files webpack produce, are placed
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/, // .less and .css
                use: [
                    'less-loader',
                    'css-loader',
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                ],
            },
        ]
    },
    // Add an instance of the MiniCssExtractPlugin to the plugins list
    // But remember - only for production!
    plugins: isProduction ? [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({template: './src/index.html'})
        ] :
        [
            new HtmlWebpackPlugin({template: './src/index.html'})
        ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
};

module.exports = config;
