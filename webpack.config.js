const path = require('path');

module.exports = {
    entry: {
        // login: './client/pages/login.jsx',
        // dashboard: './client/pages/dashboard.jsx',
        // room: './client/pages/room.jsx',
        // settings: './client/pages/settings.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],   // <-- helps import .jsx correctly
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};