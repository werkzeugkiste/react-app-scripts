import { default as babelLoader } from './babel';
import { default as cssLoaderClient } from './cssLoader.client';
import { default as cssLoaderServer } from './cssLoader.server';
import { default as cssModulesLoaderClient } from './cssModulesLoader.client';
import { default as cssModulesLoaderServer } from './cssModulesLoader.server';
import { default as fileLoaderClient } from './fileLoader.client';
import { default as fileLoaderServer } from './fileLoader.server';
import { default as urlLoaderClient } from './urlLoader.client';
import { default as urlLoaderServer } from './urlLoader.server';

export {
    babelLoader,
    cssLoaderClient,
    cssLoaderServer,
    cssModulesLoaderClient,
    cssModulesLoaderServer,
    fileLoaderClient,
    fileLoaderServer,
    urlLoaderClient,
    urlLoaderServer,
};

export const client = [
    {
        oneOf: [
            babelLoader,
            cssLoaderClient,
            cssModulesLoaderClient,
            fileLoaderClient,
            urlLoaderClient,
        ],
    },
];

export const server = [
    {
        oneOf: [
            babelLoader,
            cssLoaderServer,
            cssModulesLoaderServer,
            fileLoaderServer,
            urlLoaderServer,
        ],
    },
];
