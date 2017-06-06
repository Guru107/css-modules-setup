var fs = require('fs'),
	path = require('path'),
	webpack = require('webpack')

const externals = fs.readdirSync('./node_modules')
			.filter(x => !/\.bin|react-loadable|webpack-flush-chunks/.test(x))
			.reduce((externals,mod) => {
				externals[mod] = `commonjs ${mod}`
				return externals
			},{})

module.exports = {
	name:'server',
	target:'node',
	devtool: 'source-map',
	entry:['./server/index.js'],
	externals:externals,
	output:{
		path:path.join(__dirname,'/build-src'),
		filename:'[name].js',
		libraryTarget:'commonjs2',
		publicPath:'/'
	},
	module:{
		rules: [
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:'babel-loader'
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				use:'css-loader/locals?modules&localIdentName=[name]__[local]--[hash:base64:5]'
			}
		]
	},
	plugins:[
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
	]
}