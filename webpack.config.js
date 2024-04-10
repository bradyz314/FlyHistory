const HTMLPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                 use: [
                   {
                    loader: "ts-loader",
                     options: {
                       compilerOptions: { noEmit: false },
                      }
                    }],
                 exclude: /node_modules/,
              },
              {
                exclude: /node_modules/,
                test: /\.css$/i,
                 use: [
                    "style-loader",
                    "css-loader"
                 ]
              },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    plugins: [
        /* Necessary to use HTMLPlugin to inject the bundle into the index.html */
        new HTMLPlugin({
            template: "./public/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: "public", 
                    to: "", 
                    globOptions: {
                        ignore: ["**/index.html"], // This line excludes index.html
                    },
                },
            ],
        }),
    ],
};