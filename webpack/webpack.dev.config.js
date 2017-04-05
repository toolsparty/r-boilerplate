// Webpack config for development
let fs = require('fs');
let path = require('path');
let webpack = require('webpack');

let os = require('os');
let ifaces = os.networkInterfaces();
let jeet = require('jeet');
let rupture = require('rupture');
let localIp = '';

let port = '3015';

Object.keys(ifaces).forEach(function (ifname) {
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    localIp = '127.0.0.1';
  });
});

module.exports = {
  port: port,
  localIp: localIp,
  context: path.resolve(__dirname, '..'),
  devtool: 'cheap-eval-source-map',
  entry: {
    'main': [
      'webpack-dev-server/client?http://' + localIp + ':' + port,
      'webpack/hot/dev-server',
      './src/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname),
    publicPath: 'http://' + localIp + ':' + port + '/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          sourceMap: true
        }
      },
      {
        test: /\.styl|\.css$/,
        loader: 'style'
      },
      {
        test: /\.styl|\.css$/,
        loader: 'css',
        query: {
          importLoaders: 1,
          localIdentName: '[local]',
          sourceMap: true
        }
      },
      {
        test: /\.styl|\.css$/,
        loader: 'autoprefixer'
      },
      {
        test: /\.styl|\.css$/,
        exclude: /node_modules/,
        loader: 'stylus',
        query: {
          sourceMap: true
        }
      },
      {
        test: /\.woff$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=application/font-woff'
      },
      {
        test: /\.woff2$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=application/font-woff'
      },
      {
        test: /\.ttf$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=application/octet-stream'
      },
      {
        test: /\.eot$/,
        loader: 'file?name=[path][name].[ext]' },
      {
        test: /\.svg$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=image/svg+xml'
      },
      {
        test: /\.png$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=image/png+xml'
      },
      {
        test: /\.jpg$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=image/jpg+xml'
      },
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'STAGING': process.env.NODE_ENV === 'staging',
      'PRODUCTION': process.env.NODE_ENV === 'production'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/),
    new webpack.HotModuleReplacementPlugin()
  ],
  target: 'web', // Make web letiables accessible to webpack, e.g. window
  stats: true, // Don't show stats in the console
  progress: true,
  stylus: {
    use: [jeet(), rupture()],
    import: [path.resolve(__dirname, '../src/styles/common.styl')]
  },
};
