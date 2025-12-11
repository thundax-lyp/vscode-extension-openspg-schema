const {defineConfig} = require('@vscode/test-cli');

module.exports = defineConfig({
    version: '1.106.1',
    files: 'dist/test/**.test.js'
});
