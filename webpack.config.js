/**
 * webpack.config.js
 */

module.exports = {

    entry: {
        app: ["./src/portal-entry.js"]
    },

    output: {
        filename: "./bundle.js"
    },

    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loader: "babel?stage=0" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=20000"},
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader?name=[name].[ext]" }
        ]
    },

    resolve: {
        extensions: ["", ".js", ".jsx", ".json"]
    }
};
