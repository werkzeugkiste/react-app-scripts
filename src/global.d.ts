declare module 'write-file-webpack-plugin';

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        SOURCE_LANGUAGE: 'string';
        MANIFEST_FILENAME: 'string';
    }
}
