import * as path from 'path';

import { runTests } from '@vscode/test-electron';

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

        const launchArgs: string[] = [];

        // reset user-data-dir to make path shorter
        const userDataDir = process.env['CODE_TESTS_USER_DATA_DIR'];
        if (userDataDir) {
            launchArgs.push(`--user-data-dir=${path.resolve(__dirname, userDataDir)}`);
        }

        console.log(`With args ${JSON.stringify(launchArgs)}`);

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            version,
            launchArgs
        });
    } catch {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
