const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const { clientDevPort } = require('./config')

const clientConfig = {
    name: 'client',
    entry: './src/index.js',
    output: {
        filename: 'app.js'
    },
    devServer: {
        port: clientDevPort
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    target: 'web',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}

const serverConfig = {
    name: 'server',
    entry: './server/boot.js',
    output: {
        filename: 'server.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: [path.resolve(__dirname, 'node_modules')]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    mode: 'development',
    externals: [nodeExternals()],
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false, // if you don't put this is, __dirname
        __filename: false // and __filename return blank or /
    },
    plugins: [
        new NodemonPlugin({
            watch: path.resolve(__dirname, 'dist'),
            script: path.resolve(__dirname, 'dist/server.js')
        })
    ]
}

module.exports = [serverConfig, clientConfig]
