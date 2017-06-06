var path = require('path'),
webpack = require('webpack'),
ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
module.exports = {
	entry:[
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
		'react-hot-loader/patch',
		'./client/index.js'
	],
	output:{
		path: path.join(__dirname,'public'),
		filename:'[name].js',
		publicPath:'/'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:ExtractCssChunks.extract({
					use:{
						loader:'css-loader',
						options:{
							modules:true,
							localIdentName:'[name]__[local]--[hash:base64:5]'
						}
					}
				})
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:{
					loader:'babel-loader',
					options:{
						babelrc:false,
						presets:['es2015','react'],
						plugins:[
							'react-hot-loader/babel',
							[
								'react-loadable/babel',
								{
									server: true,
									webpack:true
								}
							]
						]
					}
				}
			}
		]
	},
	plugins: [
		new ExtractCssChunks(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
	]
}