import webpack from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import { shouldGenerateSourcemap } from '../../utils';
import baseConfig from './client.base';

const config = {
    ...baseConfig,
    plugins: [
        new WriteFileWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        ...baseConfig.plugins,
    ],
    mode: 'development',
    devtool: shouldGenerateSourcemap() ? 'cheap-module-inline-source-map' : false,
    performance: {
        hints: false,
    },
};

export default config;
