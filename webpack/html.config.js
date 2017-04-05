let path = require('path');
let fs = require('fs');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let srcDir = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
let manifestPath = path.resolve(__dirname, '../public/'+ srcDir + '/manifest.json');
let manifestFile = '';

try {
  manifestFile = fs.statSync(manifestPath) && JSON.parse(fs.readFileSync(manifestPath).toString());
} catch (err) {
  if (err.code === 'ENOENT') console.info('==> ☠  Manifest file does not exists!');
}

let getManifestItem = (key) => manifestFile && manifestFile[key];

module.exports = {
  output: {
    path: path.join('public', srcDir),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.tpl.ejs',
      bundleJsFile: path.join(getManifestItem('main.js')),
      bundleCssFile: path.join(getManifestItem('main.css'))
    })
  ]
};
