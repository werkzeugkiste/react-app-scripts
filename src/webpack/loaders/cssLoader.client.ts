import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { cssRegex, cssModulesRegex } from '../../config';
import { shouldGenerateSourcemap } from '../../utils';

export default {
    test: cssRegex,
    exclude: cssModulesRegex,
    use: [
        require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        require.resolve('css-loader'),
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: shouldGenerateSourcemap(),
            },
        },
    ],
};
