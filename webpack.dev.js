const path = require("path");
const CURRENT_WORKING_DIRECTORY = process.cwd();
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
	name: "browser",
	devtool: "cheap-module-source-map",
	mode: "development",
	entry: [
		"webpack-hot-middleware/client?reload=true",
		path.resolve(CURRENT_WORKING_DIRECTORY, "client/index.js"),
	],
	output: {
		path: path.resolve(CURRENT_WORKING_DIRECTORY, "dist"),
		filename: "bundle.js",
		publicPath: "/dist/",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve("babel-loader"),
						options: {
							plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(woff|ttf|eot|svg|gif|jpe?g|png)(\?[\s\S]+)?$/,
				use: "file-loader",
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
		new NodePolyfillPlugin(),
	].filter(Boolean),
};
