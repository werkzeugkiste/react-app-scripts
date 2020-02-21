require('@babel/register')({
    presets: ['@werkzeugkiste/babel-presets/tooling'],
    extensions: ['.ts'],
});
// require('@babel/register')(require('@werkzeugkiste/babel-presets/tooling.config'));

module.exports = require('./index.ts').default;
