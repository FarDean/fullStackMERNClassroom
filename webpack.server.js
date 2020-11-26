const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIRECTORY = process.cwd()

module.exports={
    entry:[path.resolve(CURRENT_WORKING_DIRECTORY,'./server/server.js')],
    output:{
        path:path.resolve(CURRENT_WORKING_DIRECTORY, 'dist'),
        filename: 'server.generated.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals:[nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}
