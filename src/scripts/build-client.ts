import webpack from 'webpack';
import rimraf from 'rimraf';
import chalk from 'chalk';
import getConfig from '../webpack';
import paths from '../paths';
import { logMessage, compilerPromise } from '../utils';

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const build = async () => {
    rimraf.sync(paths.clientBuild);
    rimraf.sync(paths.serverBuild);

    const [clientConfig] = webpackConfig;
    const webpackCompiler = webpack([clientConfig]);

    const clientCompiler = webpackCompiler.compilers.find((compiler) => compiler.name === 'client');
    const clientPromise = compilerPromise('client', clientCompiler);

    if (!clientCompiler) {
        logMessage(
            'No client compiler found. Make sure to set the `name` property to `client` in your client webpack config',
            'error'
        );
        process.exit();
    }

    clientCompiler.watch({}, (error: any, stats: any) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(clientConfig.stats));
            return;
        }
        console.error(chalk.red(stats.compilation.errors));
    });

    // wait until client and server is compiled
    try {
        await clientPromise;
        logMessage('Done!', 'info');
        process.exit();
    } catch (error) {
        logMessage(error, 'error');
    }
};

build();
