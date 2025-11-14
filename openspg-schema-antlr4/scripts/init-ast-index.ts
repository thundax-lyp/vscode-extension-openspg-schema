import * as fs from "fs"
import {camelCase} from "lodash-es";
import path from "node:path";

const listFiles = (root: string): string[] => {
    try {
        return fs.readdirSync(root)
    } catch (error) {
        console.error(`Error reading directory: ${root}`)
        return []
    }
}

const camelToTitleCase = (x: string): string => x.substring(0, 1).toUpperCase() + x.substring(1)

const buildModuleIndex = (moduleFolder: string) => {
    console.log(`processing \x1b[34m${moduleFolder}\x1b[0m ...`)
    const filenames = listFiles(moduleFolder)
        .filter(x => fs.statSync(`${moduleFolder}/${x}`).isFile())
        .filter(x => x.endsWith('.ts'))
        .filter(x => x !== "index.ts" && x !== "index.node.ts")
    console.log(`find \x1b[34m${filenames.length}\x1b[0m structure files`)

    const structures = filenames
        .map(x => x.substring(0, x.length - 3))
        .sort((x1, x2) => x1.localeCompare(x2))
        .map(x => {
            const baseName = x
            const structureName = camelToTitleCase(camelCase(x))
            return {
                baseName, structureName,
            }
        })

    const saveIndexNodeFile = () => {
        const indexNodeContent = ''
            + structures.map(({baseName, structureName}) => `import {${structureName}} from './${baseName}';`).join('\n')
            + '\n\n'
            + 'export {\n'
            + structures.map(({structureName}) => `\t${structureName},`).join('\n')
            + '\n}\n'
            + ''
        const indexNodeFileName = path.join(moduleFolder, "index.node.ts")
        fs.writeFileSync(indexNodeFileName, indexNodeContent)
        console.log(`save \x1b[34m${indexNodeFileName}\x1b[0m`)
    }
    saveIndexNodeFile()

    const saveIndexFile = () => {
        const baseClassName = path.basename(moduleFolder)
        const classVariantName = camelCase(baseClassName)
        const className = camelToTitleCase(classVariantName)

        const indexContent = 'import * as nodeMap from \'./index.node\';\n'
            + 'import {UnionSyntaxNode, UnionSyntaxNodeType} from \'../base\';\n'
            + '\n'
            + `export type ${className}Node = UnionSyntaxNode<typeof nodeMap>;\n`
            + `export type ${className}NodeType = UnionSyntaxNodeType<typeof nodeMap>;\n`
            + '\n'
            + `export const ${classVariantName}NodeTypes = Object.keys(nodeMap) as ${className}NodeType[];\n`
            + '\n'
            + structures.map(({baseName}) => `export * from './${baseName}';`).join('\n')
            + '\n\n'
            + ''

        const indexFileName = path.join(moduleFolder, "index.ts")
        fs.writeFileSync(indexFileName, indexContent)
        console.log(`save \x1b[34m${indexFileName}\x1b[0m\n`)
    }
    saveIndexFile()
}


const buildASTIndex = (rootFolder, moduleFolders: string[]) => {
    console.log(`processing index`)

    const modules = moduleFolders.map(x => path.basename(x))

    const saveIndexNodeFile = () => {
        const content = ''
            + modules.map(x => `export * from "./${x}/index.node";`).join('\n')
            + ''
        const fileName = path.join(rootFolder, "index.node.ts")
        fs.writeFileSync(fileName, content)
        console.log(`save \x1b[34m${fileName}\x1b[0m`)
    }
    saveIndexNodeFile()

    const saveIndexFile = () => {
        const content = 'import * as nodeMap from "./index.node";\n'
            + '\n'
            + modules.map(x => `import {${camelToTitleCase(x)}Node} from "./${x}";`).join('\n')
            + '\n\n'
            + `export type SyntaxNode =\n`
            + modules.map(x => `    | ${camelToTitleCase(x)}Node`).join('\n')
            + '\n'
            +'    ;\n\n'
            + `export type SyntaxNodeType = SyntaxNode['type'];\n`
            + '\n'
            + 'export const syntaxNodeTypes = Object.keys(nodeMap) as SyntaxNodeType[];\n'
            + '\n'
            + '\n'
            + modules.map(x => `export * from "./${x}";`).join('\n')
            + '\n'
            + ''

        const fileName = path.join(rootFolder, "index.ts")
        fs.writeFileSync(fileName, content)
        console.log(`save \x1b[34m${fileName}\x1b[0m\n`)
    }
    saveIndexFile()
}

const run = () => {
    const args = process.argv.slice(2)
    if (args.length < 1) {
        console.log("Usage:\n")
        console.log("\tnode init-ast-index.ts [root]")
    }

    const rootFolder = args[0]
    console.log(`scanning \x1b[31m${rootFolder}\x1b[0m`)

    let folders = listFiles(rootFolder)
        .map(x => path.join(rootFolder, x))
        .filter(x => fs.statSync(x).isDirectory())
    console.log(`find \x1b[31m${folders.length}\x1b[0m files\n`)

    folders.forEach(x => buildModuleIndex(x))

    buildASTIndex(rootFolder, folders)

    console.log('=== Finish ===')
}

run()
