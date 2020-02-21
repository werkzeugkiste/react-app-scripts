import fs from 'fs';
import { Configuration } from 'webpack';
import { resolvePreferred } from '../utils';

// type ConfigArray = [Configuration, Configuration];
type ConfigArray = Configuration[];

type FunctionReturningConfig = (config: Configuration, options: any) => Configuration;

type ConfigurationFactory = (
    defaultConfig: ConfigArray,
    options: { [key: string]: any }
) => ConfigArray;

const defaultProdConfig: ConfigArray = [
    require('./configs/client.prod').default,
    require('./configs/server.prod').default,
];

const defaultDevConfig: ConfigArray = [
    require('./configs/client.dev').default,
    require('./configs/server.dev').default,
];

const localConfigPath = resolvePreferred('webpack');

const getDefaultConfig = () =>
    process.env.NODE_ENV === 'production' ? defaultProdConfig : defaultDevConfig;

const loadLocalConfig = (env: string): ConfigArray => {
    // No local config found. Fallback to default configs
    if (fs.existsSync(localConfigPath) === false) {
        return getDefaultConfig();
    }

    const options = { env };

    try {
        const localConfig: ConfigurationFactory | ConfigArray = require(localConfigPath);

        if (typeof localConfig === 'function') {
            return localConfig(getDefaultConfig(), options);
        }

        if (Array.isArray(localConfig)) {
            return localConfig.map((config: Configuration | FunctionReturningConfig, i: number) => {
                // TODO: Double check if this is a possible use case
                if (typeof config === 'function') {
                    const defaultConfig = getDefaultConfig();
                    return config(defaultConfig[i], { ...options, configIndex: i });
                }
                return config;
            });
        }

        return getDefaultConfig();
    } catch (error) {
        return getDefaultConfig();
    }
};

// This is the default Webpack ConfigurationFactory interface
export default (env: string = 'production'): ConfigArray => {
    if (env === 'production') {
        process.env.NODE_ENV = 'production';
    } else {
        process.env.NODE_ENV = 'development';
    }

    return loadLocalConfig(env);
};
