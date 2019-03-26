var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WorkboxPlugin = require('workbox-webpack-plugin');
var package = require('./package.json');
var autoprefixer = require('autoprefixer');
var HandlebarsPlugin = require("handlebars-webpack-plugin");
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var $ = require('jquery');
// require("jquery-mousewheel")($);
// require('malihu-custom-scrollbar-plugin')($);




var watch = false;
var mode = 'production';
// mode = 'development';
module.exports = {
    entry: {
        vendor: Object.keys(package.dependencies),
        index: './src/customers/numedia/scripts/bootstrap',
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'wp-content/themes/dzNumedia/assets/js/[name].bundle.js',
        chunkFilename: 'wp-content/themes/dzNumedia/assets/js/[name].bundle.js',
        publicPath: "/",
    },
    watch: watch,
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts", '.scss', '.css'],
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@scss': path.resolve(__dirname, 'src/customers/numedia/sass'),
            '@img': path.resolve(__dirname, 'src/customers/numedia/assets/images'),
            '@svg': path.resolve(__dirname, 'src/customers/numedia/assets/svg'),
            '@parts': path.resolve(__dirname, 'src/customers/numedia/parts'),
            '@': path.resolve(__dirname, 'src/customers/numedia'),
            // 'malihu-custom-scrollbar-plugin': 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
        }
    },
    // devServer: {
    //     contentBase: path.join(__dirname, './server'),
    //     watchContentBase: true,
    //     publicPath: "./dist",
    //     // port: 9000
    // },
    module: {
        rules: [{
                test: require.resolve('jquery'),
                loader: 'expose-loader?jQuery!expose-loader?$'
            },
            {
                test: /jquery-mousewheel/,
                loader: "imports-loader?define=>false&this=>window"
            },

            {
                test: /malihu-custom-scrollbar-plugin/,
                loader: "imports-loader?define=>false&this=>window"
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    // disable type checker - we will use it in fork plugin
                    transpileOnly: true
                }
            },
            {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                url: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                autoprefixer: {
                                    browsers: ["last 2 versions"]
                                },
                                sourceMap: true,
                                plugins: () => [
                                    autoprefixer
                                ]
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                    ],
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'wp-content/themes/dzNumedia/assets/images/',
                        name: '[name].[ext]',
                    },
                }, ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'wp-content/themes/dzNumedia/assets/fonts/',
                        name: '[name].[ext]',
                    },
                }]
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'wp-content/themes/dzNumedia/assets/svg/',
                        name: '[name].[ext]',
                    },
                }, ]
            },
            {
                test: /\.(hbs|handlebars)$/,
                loader: "handlebars-loader",
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader?classPrefix',
            // options: {
            //     // noquotes: true
            // }
            // },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-url-loader',
            //     options: {
            //         noquotes: true
            //     }
            // },
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(['./dist']),
        new ForkTsCheckerWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.vv': 'VV',
            'window.moment': 'moment',
        }),
        new ExtractTextPlugin({
            filename: 'wp-content/themes/dzNumedia/assets/css/app.bundle.css'
        }),

        new FaviconsWebpackPlugin({
            logo: '@img/icon.png',
            // The prefix for all image files (might be a folder or a name)
            prefix: 'wp-content/themes/dzNumedia/assets/icons/',
            // Emit all stats of the generated icons
            emitStats: false,
            // The name of the json containing all favicon information
            statsFilename: 'iconstats.json',
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: false,
            // Inject the html into the html-webpack-plugin
            inject: true,
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: '#171413',
            theme_color: '#5B4EA0',
            themeColor: '#5B4EA0',
            "theme-color": '#5B4EA0',
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: 'Numedia',

            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: true,
                twitter: true,
                yandex: true,
                windows: true
            }
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Homepage',
            pageHeader: 'Home Page',
            template: './src/customers/numedia/templates/index.html',
            filename: './index.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Article',
            template: './src/customers/numedia/templates/article.html',
            filename: './article.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Category',
            template: './src/customers/numedia/templates/category.html',
            filename: './category.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Serie',
            template: './src/customers/numedia/templates/serie.html',
            filename: './serie.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Search',
            template: './src/customers/numedia/templates/search.html',
            filename: './search.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Watch',
            template: './src/customers/numedia/templates/watch.html',
            filename: './watch.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'video',
            template: './src/customers/numedia/templates/video.html',
            filename: './video.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: '404',
            template: './src/customers/numedia/templates/404.html',
            filename: './404.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'construction',
            template: './src/customers/numedia/templates/construction.html',
            filename: './construction.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'live',
            template: './src/customers/numedia/templates/live.html',
            filename: './live.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'featured',
            template: './src/customers/numedia/templates/featured.html',
            filename: './featured.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Design',
            template: './src/customers/numedia/templates/design.html',
            filename: './design.html',
            chunks: ['index'],
            inject: 'head',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                    // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new CopyWebpackPlugin([{
            from: './src/customers/numedia/sw.js',
            to: './',
            force: true,

            // context: 'app/'
        }], {
            copyUnmodified: true,
        }),

    ],

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '.',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\/]node_modules[\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    // node: {
    //     fs: 'empty',
    //     net: 'empty',
    //     child_process: 'empty',
    //     tls: 'empty',
    //     dns: 'empty'
    // },
    devtool: 'source-map',
    mode: mode
};