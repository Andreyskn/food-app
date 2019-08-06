const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.base.js');

module.exports = merge(base, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		publicPath: '/',
		historyApiFallback: true,
		hot: true,
		proxy: {
			'*': 'http://localhost:3000',
		},
	},
});
