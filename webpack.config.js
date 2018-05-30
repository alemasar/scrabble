const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');
const pjson = require('./package.json');

var p = {}
p['./dist/js/' + pjson.name + '.bundle.js'] = './src/js/main.js';

var css = {}
css['./dist/css/' + pjson.name] = './src/sass/' + pjson.name + '.scss';

const extractStyles = (loaders) => {
	return ExtractTextPlugin.extract({
		use: loaders
	});
};

module.exports = [
	{
		entry: p,
		output: {
			path: path.resolve(__dirname),
			pathinfo: true,
			filename: "[name]",
			chunkFilename: "[id].bundle.js"
		},
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: 'babel-loader'
				}
			]
		}
	},
	{
		entry: css,
		output: {
			path: path.resolve(__dirname),
			pathinfo: true,
			filename: "[name].css"
		},
		module: {
			rules: [
				{
					test: /\.(svg|png|jpg|jpeg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'dist/images/[name].[ext]',
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: extractStyles(['css-loader', 'sass-loader'])
				},
				{
					test: /\.css$/,
					use: extractStyles(['css-loader'])
				}
			]
		},
		plugins: [
			new ExtractTextPlugin({ // define where to save the file
				filename: "[name].css",
				allChunks: true
			}),
			new CopyWebpackPlugin([
				{ from: './src/images/*', to: './dist/images/', flatten: true }
			], {}),
			new webpack.HotModuleReplacementPlugin()
		],
		devServer: {
			contentBase: './',
			historyApiFallback: true,
			inline: true,
			overlay: {
				errors: true,
				warnings: true,
			}
		}
	}
]
