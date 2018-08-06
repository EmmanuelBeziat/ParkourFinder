const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		devtool: 'source-map',
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					PACKAGE_JSON: '"' + escape(JSON.stringify(require('./package.json'))) + '"'
				}
			})
		]
	},
	outputDir: '../site',
	devServer: {
		port: 3042,
	}
}
