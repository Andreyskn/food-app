// const webpack = require('webpack');
const path = require('path');

// Developemnt Mode Plugins
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',

	devServer: {
		contentBase: path.join(__dirname, 'src'),
		publicPath: '/',
		historyApiFallback: true,
		hot: true,
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
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
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NamedModulesPlugin(),
		new HTMLWebpackPlugin({ template: path.resolve(__dirname, './src/index.html') }),
	],
}
