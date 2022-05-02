const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// const copyWebpackPlugin = require('copy-webpack-plugin'); //this pluggin  could be skipped
//optimization
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const terseWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//variables de entorno
const dotendWebpack = require('dotenv-webpack');


module.exports = {
    //Define el punto de entrada de la aplicacion
    entry: './src/index.js',
    //define la salida, es decir donde se guardaran los archivos una vez compilados
    //la ruta path: y el nombre del archivo filename: 
    // por convencion el nombre del archivo es main
    output: {
        path: path.resolve(__dirname,'dist'),
        //se agrega los [] para la optimizacion
        filename: '[name].[contenthash].js',
        //from url-loader and file-loader packages
         assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    //define las extenciones de los archivos compilados
    resolve:{
        extensions: [ '.js'],
        alias:{
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@utils': path.resolve(__dirname, 'src/utils/')
        }
    },
    module:{
        rules: [
            //babel rules
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            //mini-css-extract-Pligin
            {
                test: /\.css$/i,
                use:[
                    miniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            //images loader, from webpack and doesn't need external package
            {
                test:/\.png/,
                type: 'asset/resource'
            },
            //url-loader Rule
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader: 'url-loader',
                    options:{
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        //agregado el .[content] de las optimizacion
                        name: '[name].[content].[ext]',
                        outputPath: './assets/fonts/',
                        publicPath: './assets/fonts/',
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            inject: true,
            //path del archivo sin procesar
            template: './public/index.html',
            //path del archivo de salida ya procesado
            filename: './index.html'
        }),
        new miniCssExtractPlugin({
            //esta configuracion se agrega por la optimizacion
            filename: 'assets/[name].[contenthash].css'
        }),
        //this pluggin could be skipped
        // new copyWebpackPlugin({
        //     patterns:[
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"),
        //             to: "assets/images"
        //         }
        //     ]
        // })
        new dotendWebpack(),
        new CleanWebpackPlugin()
    ],
    //optimization
    optimization:{
        minimize: true,
        minimizer:[
            new cssMinimizerWebpackPlugin(),
            new terseWebpackPlugin()
        ]
    }
    
}