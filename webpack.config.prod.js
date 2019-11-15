const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const clientConfig = {
    name: 'client',
    entry: './src/index.js',
    output: {
        filename: 'client.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                { targets: '> 0.25%, not dead' }
                            ],
                            '@babel/preset-react'
                        ]
                    }
                },
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
    mode: 'production',
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
    mode: 'production',
    externals: [nodeExternals()],
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false, // if you don't put this is, __dirname
        __filename: false // and __filename return blank or /
    }
}

module.exports = [serverConfig, clientConfig]
