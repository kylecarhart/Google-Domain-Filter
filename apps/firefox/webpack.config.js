const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const { tlds } = require("./src/tlds");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (env) => {
  return {
    mode: env.mode,
    // One entry point for each part of an extension
    entry: {
      background: "./src/background",
      content: "../../libs/common/extension/content",
      popup: "../../libs/common/extension/popup",
      options: "../../libs/common/extension/options",
    },
    // Output each in a folder named after their entry
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "./[name]/index.js",
    },
    devtool: false, // Remove eval() from javascript
    watch: env.watch ? true : false,
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        // Transpile javascript ES6 -> ES5
        { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
        { test: /\.js$/, loader: "source-map-loader" },
        {
          test: /\.(jsx?)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        // Load HTML
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        // Load CSS
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      // Create index.html for popup
      new HtmlWebPackPlugin({
        template: "../../libs/common/extension/popup/index.html",
        filename: "./popup/index.html",
        chunks: ["popup"],
      }),
      // Create index.html for options
      new HtmlWebPackPlugin({
        template: "../../libs/common/extension/options/index.html",
        filename: "./options/index.html",
        chunks: ["options"],
      }),
      // Copy manifest.json
      new CopyPlugin({
        patterns: [
          // Generate manifest
          {
            from: "./src/manifest.json",
            to: ".",
            transform: (content) => {
              const manifest = JSON.parse(content.toString());

              const matchPatterns = tlds.map(
                (tld) => `*://*.google.${tld}/search?*`
              );

              // Allow webRequest to intercept on all google tlds
              manifest.permissions.push(...matchPatterns);

              // Allow content scripts to run on all google tlds
              manifest.content_scripts[0].matches.push(...matchPatterns);

              // Take the version number from the package.json
              manifest.version = process.env.npm_package_version;

              const manifestJSON = JSON.stringify(manifest, null, 2);
              return manifestJSON;
            },
          },
          // Copy static files (imgs)
          {
            from: "../../libs/common/static/png/logo*.png",
            to: "./static/[name][ext]",
          },
          // Copy content styles
          {
            from: "../../libs/common/extension/content/styles.css",
            to: "./content",
          },
        ],
      }),
      // Inject version number
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(process.env.npm_package_version),
      }),
    ],
  };
};
