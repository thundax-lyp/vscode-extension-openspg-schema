import {DocumentLink} from "vscode-languageserver";
import {visit} from "openspg-concept-rule-antlr4";
import {documents} from "../common";
import {Context, OnDocumentLinks} from '../context';


export const onDocumentLinks: OnDocumentLinks = (_: Context) => async ({textDocument}) => {
    const document = documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const links: DocumentLink[] = [];
    visit(document.ast, {
        NamespaceDeclaration: ({node}) => {
            try {
                console.log('='.repeat(40))
                console.log(node.variable.text)
                console.log(links)
                console.log('.='.repeat(40))
                // const importPath = document.resolvePath(path.node.variable.text).toString(true);
                // links.push(DocumentLink.create(document.getNodeRange(path.node.path), importPath));
            } catch (error) {
                // Ignore errors: console.error(error);
            }
        },
    });
};
