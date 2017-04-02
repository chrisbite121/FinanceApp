const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const path = require('path');

var root = function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
};

module.exports = (envOptions) => { 
        envOptions = envOptions || {}
        const config = {};
        // const config = {
        //     entry: './src/main.ts',
        //     output: {
        //         path: __dirname + '/dist',
        //         filename: 'app.bundle.js'
        //     },
        //     resolve: {
        //         extensions: ['.js', '.ts', '.html','.css']
        //     },
        //     module: {
                // loaders: [
                //     { test: /\.ts$/, loader: '@ngtools/webpack' },
                //     // {test: /\.ts$/, loader: 'ts-loader!angular2-template-loader'},
                //     // // {test: /\.ts$/, exclude:/\..component\.ts$/, loader: 'ts-loader'},
                //     {test: /\.html$/, loader: 'raw-loader'},
                //     {test: /\.css$/, loader: 'raw-loader'}
                // ]
            // }            
            // plugins: [
            //    new AotPlugin({
            //         tsConfigPath: root('./tsconfig.aot.json'),
            //         entryModule: root('src', 'app', 'app.module#AppModule'),
            //         mainPath: root('src', 'main.ts'),
            //         skipCodeGeneration: false
            //     }),
            //     new webpack.optimize.UglifyJsPlugin({
            //         beautify: false,
            //         mangle: {
            //             screw_ie8: true,
            //             keep_fnames: true
            //         },
            //         compress: {
            //             warnings: false,
            //             screw_ie8: true
            //         },
            //         comments: false
            //     }),                
            //     new HtmlWebpackPlugin({
            //         template: './src/index.html'
            //     }),
            //     new webpack.DefinePlugin({
            //         app: {
            //             environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
            //         }
            //     })
            // ]
        // }
        console.log(envOptions.MODE);
        if (envOptions.MODE === 'prod') {
            config.entry = './src/main.ts',
            config.output = {
                path: __dirname + '/dist',
                filename: 'app.bundle.js'
            };
            config.resolve = {
                extensions: ['.js', '.ts', '.html','.css']
            };
            config.module = {}
            config.module.loaders = [
                    { test: /\.ts$/, loader: '@ngtools/webpack' },
                    // {test: /\.ts$/, loader: 'ts-loader!angular2-template-loader'},
                    // // {test: /\.ts$/, exclude:/\..component\.ts$/, loader: 'ts-loader'},
                    {test: /\.html$/, loader: 'raw-loader'},
                    {test: /\.css$/, loader: 'raw-loader'}
                ];
            config.plugins = [
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
                        environment: JSON.stringify('production')
                    }
                })
            ]     
        } else {
            config.entry = './src/main-jit.ts',
            config.output = {
                    path: __dirname + '/dist',
                    filename: 'app.bundle.js'
                },
            config.resolve = {
                    extensions: ['.js', '.ts', '.html','.css']
            };
            config.module = {};
            config.module.loaders = [
                    { test: /\.ts$/, loader: '@ngtools/webpack' },
                    // {test: /\.ts$/, loader: 'ts-loader!angular2-template-loader'},
                    // {test: /\.ts$/, exclude:/\..component\.ts$/, loader: 'ts-loader'},
                    {test: /\.html$/, loader: 'raw-loader'},
                    {test: /\.css$/, loader: 'raw-loader'}
                ];
            config.plugins = [
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

        return config
    
};