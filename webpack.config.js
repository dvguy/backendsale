/*//  webpack.config.js 
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },

    devServer: {
        port: 1000
    },
/*
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      },
 
    module: {
    rules: [
        {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env']
            }
        }
        }
    ]
    }
};
*/


//exclude: /node_modules/ 
