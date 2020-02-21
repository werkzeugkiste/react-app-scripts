import { resolvePreferred, resolveApp, resolvePackage } from './src/utils';

console.log(resolveApp('webpack/template.html'));
console.log(resolvePackage('webpack/template.html'));
console.log(resolvePreferred('webpack/template.html'));

const localWpConfig = async () => {
    return 'Local';
};

const build = () => {
    return localWpConfig();
};

const main = async () => {
    const result = await build();
    console.log(result);
};

main();
