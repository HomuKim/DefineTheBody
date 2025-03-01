const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.module\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico)$/i,
				type: 'asset/resource', // 이미지 파일 처리
				generator: {
					filename: 'images/[name][ext]', // 빌드된 이미지 파일 경로
				},
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html'),
			filename: 'index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/images'),
					to: 'images',
				},
			],
		}),
	],
	devServer: {
		static: [
			{
				directory: path.join(__dirname, 'public'),
				publicPath: '/'
			},
			{
				directory: path.join(__dirname, 'dist'),
				publicPath: '/'
			}
		],
		port: 3009,
		open: true,
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},
	mode: 'development',
};
