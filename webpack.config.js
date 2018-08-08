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
      root: "Scrypt",
      commonjs: "scrypt",
      commonjs2: "scrypt"
    }
  },
  target: "node",
  output: {
    filename: "ERC20Token.js",
    path: path.resolve(__dirname, "dist"),
    library: "ERC20Token",
    libraryTarget: "umd"
  },
  mode: "production"
};
