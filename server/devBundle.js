import webpack from 'webpack'
import webpackConfig from './../webpack.dev'
import middleware from 'webpack-dev-middleware'
import hotmiddleware from 'webpack-hot-middleware'

const compiler = webpack(webpackConfig)

export const compile = app=>{
    app.use(middleware(compiler,{
        publicPath: webpackConfig.output.publicPath
    }))
    app.use(hotmiddleware(compiler))
}