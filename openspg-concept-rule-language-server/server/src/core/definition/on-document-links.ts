import { DocumentLink } from 'vscode-languageserver';
import * as syntax from 'openspg-concept-rule-antlr4';
import { Context, OnDocumentLinks } from '../context';

export const onDocumentLinks: OnDocumentLinks =
    (ctx: Context) =>
    async ({ textDocument }) => {
        const document = ctx.documents.get(textDocument.uri);
        if (!document || !(await document.isReady())) {
            return null;
        }

        const links: DocumentLink[] = [];
        syntax.visit(document.ast!, {
            NamespaceVariable: ({ node }) => {
                try {
                    const importPath = document.resolvePath(`${node.text}`).toString(true);
                    links.push(DocumentLink.create(document.getNodeRange(node), importPath));
                } catch (error) {
                    // Ignore errors: console.error(error);
                }
            }
        });
        return links;
    };
