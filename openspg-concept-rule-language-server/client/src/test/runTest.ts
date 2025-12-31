import * as path from 'path';

import {runTests} from '@vscode/test-electron';

async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../../');
        console.log(`Running ${extensionDevelopmentPath}`);

        // The path to test runner
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './index');

        const version = '1.106.3';

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            version,
        });
    } catch (e) {
        console.log(e);
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
