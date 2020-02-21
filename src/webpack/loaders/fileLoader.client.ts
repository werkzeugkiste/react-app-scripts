export default {
    exclude: [/\.(js|jsx|ts|tsx|css|mjs|cjs|html|htm|ejs|json)$/],
    use: [
        {
            loader: require.resolve('file-loader'),
            options: {
                // TODO: make `assets/` configurable
                name: 'assets/[name].[hash:8].[ext]',
            },
        },
    ],
};
