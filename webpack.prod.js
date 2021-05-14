const path = require("path");
const CURRENT_WORKING_DIRECTORY = process.cwd();
module.exports = {
	mode: "production",
	entry: [path.resolve(CURRENT_WORKING_DIRECTORY, "client/index.js")],
	output: {
		path: path.resolve(CURRENT_WORKING_DIRECTORY, "dist"),
		filename: "bundle.js",
		publicPath: "/dist/",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(woff|ttf|eot|svg|gif|jpe?g|png)(\?[\s\S]+)?$/,
				use: "file-loader",
			},
			{
				test: /\.woff(2)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "./font/[hash].[ext]",
							mimetype: "application/font-woff",
						},
					},
				],
			},
		],
	},
};
