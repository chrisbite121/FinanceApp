const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const path = require('path');

var root = function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
};

module.exports = (envOptions) => { 
        envOptions = envOptions || {};
        const config = {
            entry: './src/main.ts',
            output: {
                path: __dirname + '/dist',
                filename: 'app.bundle.js'
            },
            module: {
                loaders: [
                    { test: /\.ts$/, loader: '@ngtools/webpack' },
                    // {test: /\.ts$/, loader: 'ts-loader!angular2-template-loader'},
                    // // {test: /\.ts$/, exclude:/\..component\.ts$/, loader: 'ts-loader'},
                    {test: /\.html$/, loader: 'raw-loader'},
                    {test: /\.css$/, loader: 'raw-loader'}
                ]
            },
            resolve: {
                extensions: ['.js', '.ts', '.html','.css']
            },
            plugins: [
               new AotPlugin({
                    tsConfigPath: root('./tsconfig.aot.json'),
                    entryModule: root('src', 'app', 'app.module#AppModule'),
                    mainPath: root('src', 'main.ts'),
                    skipCodeGeneration: false
                }),
                new webpack.optimize.UglifyJsPlugin({
                    beautify: false,
                    mangle: {
                        screw_ie8: true,
                        keep_fnames: true
                    },
                    compress: {
                        warnings: false,
                        screw_ie8: true
                    },
                    comments: false
                }),                
                new HtmlWebpackPlugin({
                    template: './src/index.html'
                }),
                new webpack.DefinePlugin({
                    app: {
                        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
                    }
                })
            ]
        }

        // if (envOptions.MODE === 'prod') {
        //     config.module.loaders.push(
        //         { test: /\.ts$/, loaders: ['@ngtools/webpack'] }
        //     );
        //     config.plugins.push(
        //         new AotPlugin({
        //             tsConfigPath: './tsconfig.json',
        //             entryModule: 'src/app/app.module#AppModule'
        //         })
        //         // new webpack.optimize.UglifyJsPlugin({
        //         //     beautify: false,
        //         //     mangle: {
        //         //         screw_ie8: true,
        //         //         keep_fnames: true
        //         //     },
        //         //     compress: {
        //         //         warnings: false,
        //         //         screw_ie8: true
        //         //     },
        //         //     comments: false
        //         // }),
        //     );
        // }

        return config
    
};