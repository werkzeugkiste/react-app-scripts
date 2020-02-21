import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { cssRegex, cssModulesRegex } from '../../config';

export default {
    test: cssRegex,
    exclude: cssModulesRegex,
    use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
};
