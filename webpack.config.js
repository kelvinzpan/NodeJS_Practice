var path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'app_react_todo/src') + '/app/index.js',
    output: {
        path: path.resolve(__dirname, 'app_react_todo/dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'app_react_todo/src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};