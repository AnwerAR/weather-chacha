const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');
const webpack = require('webpack');
const dotenv = require('dotenv');

/**
 * Using this single webpack config for both development
 * and production with conditional configurations.
 */
module.exports = (env, argv) => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed),
        }),
    ];

    if (argv.mode === 'production') {
        plugins.push(
            new CompressionPlugin({
                filename: '[path][base].gz',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
            new CompressionPlugin({
                filename: '[path][base].br',
                algorithm: 'brotliCompress',
                test: /\.(js|css|html|svg)$/,
                compressionOptions: {
                    params: {
                        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                    },
                },
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: false,
            }),
            new MiniCssExtractPlugin(),
        );
    }

    return {
        devtool: argv.mode === 'development' ? 'eval-source-map' : false,
        mode: argv.mode || 'development',
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        entry: {
            index: path.join(__dirname, 'src', 'index.jsx'),
            barchart: path.join(__dirname, 'src/blocks', 'bar.chart.jsx'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: argv.mode === 'production' ? '[name].bundle.min.js' : '[name].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                    sideEffects: true,
                },
                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [
                        argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                        // 'style-loader',
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true },
                        },
                        'postcss-loader'],
                    sideEffects: true,
                },
            ],
        },
        plugins,
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            minimize: argv.mode === 'production',
            minimizer: [
                new CssMinimizerPlugin({
                    parallel: true,
                }),
                new TerserPlugin({
                    extractComments: 'all',
                    minify(file, sourceMap) {
                        const uglifyJsOptions = {
                            compress: true,
                            mangle: {
                                toplevel: true,
                            },
                            toplevel: true,
                        };

                        if (sourceMap) {
                            uglifyJsOptions.sourceMap = {
                                content: sourceMap,
                            };
                        }

                        // eslint-disable-next-line global-require
                        return require('uglify-js').minify(file, uglifyJsOptions);
                    },
                    terserOptions: {
                        mangle: true,
                        ie8: false,
                        keep_fnames: false,
                        safari10: false,
                    },
                }),
            ],
        },
    };
};
