const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const tlds = require('./src/tlds.json');

module.exports = (env) => {
  return {
    mode: env.mode,
    // One entry point for each part of an extension
    entry: {
      background: './src/background/',
      content: './src/content',
      popup: './src/popup/',
    },
    // Output each in a folder named after their entry
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: './[name]/index.js',
    },
    // Remove eval() from javascript
    devtool: 'none',
    watch: env.watch ? true : false,
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        // Transpile javascript ES6 -> ES5
        {
          test: /\.(jsx?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        // Load HTML
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        // Load CSS
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      // Create index.html for popup
      new HtmlWebPackPlugin({
        template: './src/popup/index.html',
        filename: './popup/index.html',
        excludeChunks: ['background', 'content'],
      }),
      // Copy manifest.json
      new CopyPlugin([
        {
          from: './src/manifest.json',
          to: '.',
          transform: (content) => {
            var manifest = JSON.parse(content.toString());

            // make any modifications you like, such as
            manifest.content_scripts[0].matches = tlds.tlds.map(
              (tld) => `*://*.google.${tld}/search?*`
            );

            // pretty print to JSON with two spaces
            const manifest_JSON = JSON.stringify(manifest, null, 2);
            return manifest_JSON;
          },
        },
        { from: './src/static/*', to: './static', flatten: true },
        {
          from:
            'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
        },
      ]),
      // Inject version number
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(process.env.npm_package_version),
      }),
    ],
  };
};
