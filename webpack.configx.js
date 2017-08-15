var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist/static'),
    publicPath: '/static',
    filename: "js/build[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
　　　　　　test: /\.html$/,
　　　　　　loader: 'html-withimg-loader'
      },
       {
         test: /\.data$/,
         loader: 'data-loader'
       },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader:'css-loader',
          fallbackLoader: 'style-loader',
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
		include: path.resolve(__dirname,'src'),
        exclude: path.resolve(__dirname,'node_modules')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?limit=8192&name=/img/[name].[ext]'
      },
      {
        test: /\.(svg|ttf)$/,
        loader: 'file-loader?limit=8192&name=/fonts/[name].[ext]'
      }
    ]
  },
  devtool: 'source-map',
  plugins:[
    new ExtractTextPlugin("css/[name][chunkhash].css"),
    // new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin({
				filename: '../index.html',
				template: path.resolve(__dirname, './index.html'),
        minify:{
           removeComments:true,
           collapseWhitespace:true
        }
      })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
	  "_PROCESS_NODE_ENV_":'"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}else if (process.env.NODE_ENV === 'develop') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"develop"'
      },
	  "_PROCESS_NODE_ENV_":'"develop"'
	  
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}