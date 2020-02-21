import { isClientOnlyBuild } from '../utils';

if (isClientOnlyBuild()) {
    require('./build-client');
} else {
    require('./build-ssr');
}
