var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env = process.env.NODE_ENV;
var DEV = env != 'production';
var bundles = ['index'];
var version = 'v_20160831110857';

console.log("环境变量: " + env, "是否开发模式：" + DEV);

module.exports = {

	entry : (function(){
		var ret = {};
		bundles.forEach(function(value, index){
			ret[value] = path.resolve('js', value);
		})
		return ret;
	})(),
	
	output : {
		path : DEV ?  './build' : path.resolve('./static'),
		filename : DEV ? 'js/[name].js' : "js/[name].js",
		publicPath : DEV ? '' : 'http://staticsports.pplive.cn/2016/mcfa-cup/static/' + version + '/'
	},

	module : {
		loaders : [
			{
				test : /\.js$/,
				loader : "babel",
                exclude: /node_modules/
			},
			{
				test : /\.vue$/,
				loader : 'vue',
				include : [
					path.resolve(__dirname, 'components')
				]
			},
			{
	        	test: /\.css$/,
	        	loader: ExtractTextPlugin.extract("style-loader", "css-loader")
	        	// loader: "style!css"
	    	},
			{
				test: /\.(png|jpg|jpeg|gif)$/, 
				loader: 'url-loader?limit=800000&name=[path][name].[ext]'
			},
			{
				test: /\.(woff|eot|ttf|svg)$/i,
			    loader: 'url-loader?limit=800000&name=[path][name].[ext]'
			}
		]
	},

	babel: {
	    presets: ['es2015', 'stage-0'],
	    plugins: ['transform-runtime']
	},

	resolve : {
		alias : {
			'vue$': 'vue/dist/vue.js',
			'loading-css' : path.resolve('css', 'loading.css'),
			'Loading' : path.resolve('components', 'Loading.vue')
		},
		extensions : ["", ".webpack.js", ".web.js", ".js", '.vue', '.css', '.scss']
	},

	plugins: (function(){
		var plugin = [
			new webpack.optimize.CommonsChunkPlugin('vendors', DEV ? 'js/vendors.js' : 'js/vendors.js'),
			new ExtractTextPlugin(!DEV ? "css/[name].css" : "css/[name].css")
		];

		bundles.forEach(function(value, index){
			plugin.push(
				new HtmlWebpackPlugin({
			    	template: value + '.html',
			    	filename: value + '.html',
			    	inject: 'body',
			    	chunks: ['vendors', value]
			    	// chunks: [value]
			    })
			);
		})

		!DEV && plugin.push(
				new webpack.optimize.UglifyJsPlugin({
			        compress: {
			            warnings: false
			        },
			        mangle: {
			            except: ['$super', '$', 'exports', 'require']
			        }
			    }));
		
		return plugin;
	})(),

	devServer: {
	    contentBase : './build',
	    historyApiFallback: true,
	    port : 3114,
	    progress: true,
	    compress: true,
	    quiet : false,
	    noInfo : true,
	    hot : true
	}
};



