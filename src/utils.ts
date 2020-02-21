import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import { localConfigFolder } from './config';

export const fileExists = (...pathSegments: string[]) => {
    if (fs.existsSync(path.join(...pathSegments))) {
        return true;
    }
    return false;
};

// Root folder of the app itself
export const appRoot = () => {
    if (fileExists(process.cwd(), 'package.json')) {
        return process.cwd();
    }
    throw new Error(
        'package.json could not be found. Please run this command from a folder with a package.json'
    );
};

// This must point to <packageRoot>/(src|dist)
export const packageDirectory = String(fs.realpathSync(path.join(__dirname, '..')));

export const appDirectory = String(fs.realpathSync(appRoot()));

export const resolveApp = (...relativePath: string[]) =>
    path.resolve(appDirectory, ...relativePath);

export const resolvePackage = (...relativePath: string[]) =>
    path.resolve(packageDirectory, ...relativePath);

export const resolvePreferred = (...relativePath: string[]) =>
    (fs.existsSync(resolveApp(...relativePath)) && resolveApp(...relativePath)) ||
    resolvePackage(...relativePath);

export const resolveConfig = (...relativePath: string[]) =>
    (fs.existsSync(resolveApp(localConfigFolder, ...relativePath)) &&
        resolveApp(localConfigFolder, ...relativePath)) ||
    resolvePackage(...relativePath);

export const requireOverridable = (file: string) => {
    const localFile = resolveApp(file);
    if (fileExists(localFile)) {
        return require(localFile);
    }

    return require(resolvePackage(file));
};

export const logMessage = (message: any, level: string = 'info') => {
    const color =
        level === 'error'
            ? 'red'
            : level === 'warning'
            ? 'yellow'
            : level === 'info'
            ? 'blue'
            : 'white';
    console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

export const compilerPromise = (name: string, compiler: any) => {
    return new Promise((resolve, reject) => {
        compiler.hooks.compile.tap(name, () => {
            logMessage(`[${name}] Compiling `);
        });
        compiler.hooks.done.tap(name, (stats: any) => {
            if (!stats.hasErrors()) {
                return resolve();
            }
            return reject(`Failed to compile ${name}`);
        });
    });
};

export const shouldGenerateSourcemap = () => (process.env.OMIT_SOURCEMAP === 'true' ? false : true);

export const isProfilerEnabled = () => process.argv.includes('--profile');

export const isTypeScript = () => fileExists(appRoot(), 'tsconfig.json');

export const isClientOnlyBuild = () => process.argv.includes('--client-only');

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
