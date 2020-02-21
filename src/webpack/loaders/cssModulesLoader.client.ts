import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { cssModulesRegex } from '../../config';
import { shouldGenerateSourcemap } from '../../utils';

export default {
    test: cssModulesRegex,
    use: [
        require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: {
                localsConvention: 'camelCase',
                modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                },
                importLoaders: 1,
                sourceMap: shouldGenerateSourcemap,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: shouldGenerateSourcemap,
            },
        },
    ],
};
