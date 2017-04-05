let path = require('path');
let webpack = require('webpack');
let CleanPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ManifestPlugin = require('webpack-manifest-plugin');
let jeet = require('jeet');
let rupture = require('rupture');

module.exports = function () {
  let rootPath = path.resolve(__dirname, '..');
  let srcDir = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
  let outPath = path.join('public', srcDir);

  return {
    context: path.resolve(__dirname, '..'),
    // devtool: 'cheap-module-source-map',
    entry: [
      './src/app.js' // Start with js/app.js...
    ],
    output: {
      path: outPath,
      filename: '[name].[hash].js'
    },
    module: {
      loaders: [
        {
        test: /\.jsx?$/, // Transform all .js files required somewhere within an entry point...
        loader: 'babel', // ...with the specified loaders...
        exclude: /node_modules/ // ...except for the node_modules folder.
        },
        {
          test: /\.styl|\.css/,
          loader: ExtractTextPlugin.extract(
            'style',
            'css?importLoaders=1&localIdentName=[local]&sourceMap!autoprefixer!stylus?sourceMap')
        },
        {
          test: /\.woff$/,
          loader: 'url?limit=10000&name=fonts/[name].[ext]&mimetype=applicationfont-woff'
        },
        {
          test: /\.woff2$/,
          loader: 'url?limit=10000&name=fonts/[name].[ext]&mimetype=applicationfont-woff'
        },
        {
          test: /\.ttf$/,
          loader: 'url?limit=10000&name=fonts/[name].[ext]&mimetype=application/octet-stream'
        },
        {
          test: /\.eot$/,
          loader: 'file?name=fonts/[name].[ext]'
        },
        {
          test: /\.svg$/,
          loader: 'url?limit=10000&name=fonts/[name].[ext]&mimetype=image/svg+xml'
        },
        {
          test: /\.png$/,
          loader: 'url?limit=10000&name=images/[name].[ext]&mimetype=image/png+xml'
        },
        {
          test: /\.jpg$/,
          loader: 'url?limit=10000&name=images/[name].[ext]&mimetype=image/jpg+xml'
        },
      ]
    },
    resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx', '.styl']
    },
    plugins: [
      new CleanPlugin(outPath, {
        root: rootPath
      }),
      new ExtractTextPlugin('[name].[hash].css', { allChunks: true }),
      new ManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          // Useful to reduce the size of client-side libraries, e.g. react
          NODE_ENV: JSON.stringify('production')
        },
        'STAGING': process.env.NODE_ENV === 'staging',
        'PRODUCTION': process.env.NODE_ENV === 'production'
      }),
      // Optimizations
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
        compress: {
          warnings: false, // ...but do not show warnings in the console (there is a lot of them)
          drop_console: true // discard calls to console.* functions in bundle file
        }
      })
    ],
    target: 'web', // Make web letiables accessible to webpack, e.g. window
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    },
    progress: true,

    stylus: {
      use: [jeet(), rupture()],
      import: [path.resolve(__dirname, '../src/styles/common.styl')]
    }
  }
};
