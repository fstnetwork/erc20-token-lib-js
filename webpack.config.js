const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./index.js"
  },
  plugins: [new CleanWebpackPlugin(["dist"])],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: "current"
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  externals: {
    scrypt: {
      commonjs: "scrypt"
    }
  },
  target: "node",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "production"
};
