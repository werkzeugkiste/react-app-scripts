import rimraf from 'rimraf';
import paths from '../paths';
import { isClientOnlyBuild } from '../utils';

rimraf.sync(paths.clientBuild);
rimraf.sync(paths.serverBuild);

if (isClientOnlyBuild()) {
    require('./start-client');
} else {
    require('./start-ssr');
}
