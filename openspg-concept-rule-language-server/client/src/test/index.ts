import * as path from 'path';
import * as Mocha from 'mocha';
import { glob } from 'glob';

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true
    });
    mocha.timeout(100000);

    const testsRoot = __dirname;
    console.log('Test Root: ' + testsRoot);

    return glob.glob('**.test.js', { cwd: testsRoot }).then(async (files) => {
        console.log(`find ${files.length} test files`);
        console.log(files);
        // Add files to the test suite
        files
            // .filter(x => x.includes('diagnostic'))
            .forEach((x) => mocha.addFile(path.resolve(testsRoot, x)));

        try {
            // Run the mocha test
            await new Promise<void>((resolve, reject) => {
                mocha.run((failures) => {
                    if (failures > 0) {
                        reject(`${failures} tests failed.`);
                    } else {
                        resolve();
                    }
                });
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    });
}
