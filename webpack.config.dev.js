//WEBPACK DEVELOPMENT MODE CONFIG FILE
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
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
    mode: 'development',    
    // watch: true,
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
        new dotendWebpack(),
    ],
    devServer:{
        static:{
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        historyApiFallback: true
    } 
}