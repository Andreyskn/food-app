const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'electron-renderer',

	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		plugins: [
			new TsConfigPathsPlugin(),
		]
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['awesome-typescript-loader'],
				exclude: [path.resolve(__dirname, 'node_modules')],
			},

			{
				test:/\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},

			{
				test: /\.(png|jpe?g|woff2)$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 50000
					}
				}]
			},
		],
	},

	plugins: [
		new HTMLWebpackPlugin({ template: path.resolve(__dirname, './src/index.html') }),
	],
}
