const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	target: 'electron-main',
	devtool: 'inline-source-map',
	entry: {
		main: './electron/main.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['awesome-typescript-loader'],
				exclude: [path.resolve(__dirname, 'node_modules')],
			},
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		})
	]
};
