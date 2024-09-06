const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: ["./src/style.scss", "./src/only-css-grid.scss"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader",
            options: {
              url: false // Disable URL handling if you don't need it
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader" // No need to specify anything, dart-sass is used by default
          }
        ]
      }
    ]
  }
};
