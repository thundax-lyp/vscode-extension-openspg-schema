import * as path from 'path';
import * as colors from 'colors';

import {downloadAndUnzipVSCode} from '@vscode/test-electron';

async function main() {

    const extensionDevelopmentPath = path.resolve(__dirname, '../');
    const version = '1.106.1';

    console.log(colors.gray(`Preparing VS Code Application`));
    console.log(`- Path   : ${colors.yellow(extensionDevelopmentPath)}`);
    console.log(`- Version: ${colors.yellow(version)}`);

    let vscodeExecutablePath = await downloadAndUnzipVSCode({
        extensionDevelopmentPath,
        version,
    })
    vscodeExecutablePath = vscodeExecutablePath.substring(extensionDevelopmentPath.length);
    if (vscodeExecutablePath.startsWith('/')) {
        vscodeExecutablePath = '.' + vscodeExecutablePath;
    } else {
        vscodeExecutablePath = './' + vscodeExecutablePath;
    }

    console.log(`Executable Path [${vscodeExecutablePath}]`);

    const args = [
        '--no-sandbox',
        '--disable-gpu-sandbox',
        '--disable-updates',
        '--skip-welcome',
        '--skip-release-notes',
        '--disable-workspace-trust',
        '--extensionDevelopmentPath=.',
    ];

    return [`"${vscodeExecutablePath}"`, ...args]
}

main().then(async (lines) => {
    const maxLength = Math.max(...lines.map(x => x.length)) + 2
    console.log('='.repeat(maxLength));
    console.log(colors.blue(lines.join(' \\\n')));
    console.log('='.repeat(maxLength));
})
