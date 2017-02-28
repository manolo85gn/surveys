const webpack = require('webpack'),
    path = require('path'),
    fs = require('fs')

const SRC = path.resolve(__dirname, "src"),
    NODE_MODULES = path.resolve(__dirname, "node_modules")

const babelSettings = {
    cacheDirectory: true,
    presets: ['es2015', 'react'],
    plugins: []
}

const config = {
      entry: './index.js',
      output: {
        path: __dirname  + '/web',
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'EntryPoint'
        },
      cache: true,
      devtool: "sourcemaps",
      plugins: [],
      devServer: {
        historyApiFallback: true
      },
      module: {
        loaders: [
          {
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: NODE_MODULES,
            query: babelSettings
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
          },
          {
            test: /\.sass/,
            loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
          },
          {
            test: /\.scss/,
            loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
          },
          {
            test: /\.less/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
          },
          {
            test: /\.styl/,
            loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
          },
          {
            test: /\.(png|jpg|gif|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
          },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
      },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    )

} else {
    config.devtool = "sourcemaps"
    config.devServer = {
        contentBase: './web',
        hot: true,
        inline: true,
        host: "0.0.0.0",
        port: 9000,
        historyApiFallback: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}


module.exports = config
