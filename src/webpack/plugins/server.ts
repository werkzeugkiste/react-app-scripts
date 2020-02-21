import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import paths from '../../paths';
// import envBuilder from '../env';

// const env = envBuilder();

// const isProfilerEnabled = () => process.argv.includes('--profile');

export default [
    new webpack.DefinePlugin({
        __SERVER__: 'true',
        __BROWSER__: 'false',
    }),
    // We should make sure to have our locales in shared/i18n/locales ready at build time.
    // They are then copied into the server build folder so they can be accessed via
    // i18next-xhr-backend and our custom /locales/:locale/:namespace endpoint.
    new CopyPlugin([
        {
            from: paths.locales,
            to: path.join(paths.serverBuild, 'locales'),
            ignore: ['*.missing.json'],
        },
    ]),
];
