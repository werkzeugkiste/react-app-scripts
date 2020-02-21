import { resolveApp, resolveConfig } from './utils';

const paths: any = {
    appHtml: resolveConfig('webpack/template.html'),
    appPublic: resolveConfig('public'),
    clientBuild: resolveApp('build/client'),
    serverBuild: resolveApp('build/server'),
    dotenv: resolveApp('.env'),
    src: resolveApp('src'),
    srcClient: resolveApp('src/client'),
    srcServer: resolveApp('src/server'),
    srcShared: resolveApp('src/shared'),
    locales: resolveApp('src/shared/i18n/locales'),
    publicPath: '/',
};

// TODO: Let TypeScript handle this
paths.resolveModules = [
    paths.srcClient,
    paths.srcServer,
    paths.srcShared,
    paths.src,
    'node_modules',
];

export default paths;
