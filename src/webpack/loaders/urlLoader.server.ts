import urlLoaderClient from './urlLoader.client';

export default {
    ...urlLoaderClient,
    options: {
        ...urlLoaderClient.options,
        emitFile: false,
    },
};
