import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import { cssModulesRegex } from '../../config';
import { shouldGenerateSourcemap } from '../../utils';

export default {
    test: cssModulesRegex,
    use: [
        {
            loader: require.resolve('css-loader'),
            options: {
                onlyLocals: true,
                localsConvention: 'camelCase',
                importLoaders: 1,
                modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                },
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
