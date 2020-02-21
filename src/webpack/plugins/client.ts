import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { isClientOnlyBuild, isProfilerEnabled } from '../../utils';
import paths from '../../paths';
import envBuilder from '../../env';

const env = envBuilder();

export default [
    /* if --client-only flag is used, we fall back to HtmlWebpackPlugin instead of using
    the server rendered HTML as base for the client build. */
    isClientOnlyBuild() &&
        new HtmlWebpackPlugin({
            filename: path.join(paths.clientBuild, 'index.html'),
            inject: true,
            template: paths.appHtml,
        }),
    // new webpack.ProgressPlugin(), // make this optional e.g. via `--progress` flag
    new webpack.DefinePlugin(env.stringified),
    new webpack.DefinePlugin({
        __SERVER__: 'false',
        __BROWSER__: 'true',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({
        fileName: process.env.MANIFEST_FILENAME || 'manifest.json',
    }),
    isProfilerEnabled() && new webpack.debug.ProfilingPlugin(),
].filter(Boolean);
