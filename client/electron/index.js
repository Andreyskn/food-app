require('ts-node').register({
	compilerOptions: {
		module: "commonjs",
		esModuleInterop: true,
	},
});
require('./main.ts');
