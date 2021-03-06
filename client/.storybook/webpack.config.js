const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
	// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	config.module.rules.push(
		{
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		},
		{
			test: /\.tsx?$/,
			use: ['awesome-typescript-loader'],
			include: path.resolve(__dirname, '../'),
			exclude: [path.resolve(__dirname, '../node_modules')],
		}
	);

	config.resolve.extensions.push('.ts', '.tsx');
	config.resolve.plugins = [new TsConfigPathsPlugin()];

	// Return the altered config
	return config;
};
