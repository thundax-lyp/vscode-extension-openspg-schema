import {DocumentSymbol, SymbolKind} from 'vscode-languageserver';
import * as syntax from "openspg-concept-rule-antlr4";
import {OnDocumentSymbol} from '../context';
import {generate} from "../common";

export const onDocumentSymbol: OnDocumentSymbol = (ctx) => async ({textDocument}) => {
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const handleNamespaceDeclaration = async (ast: syntax.NamespaceDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.variable),
        kind: SymbolKind.Namespace,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.variable),
    })

    const handleRuleWrapperDeclaration = async (ast: syntax.RuleWrapperDeclaration): Promise<DocumentSymbol> => {
        let name = await generate(ast.head)
        if (name.endsWith(':')) {
            name = name.substring(0, name.length - 1);
        }
        return {
            name,
            kind: SymbolKind.Class,
            range: document.getNodeRange(ast),
            selectionRange: document.getNodeRange(ast.head),
            children: await Promise.all(
                ast.rules
                    .flatMap(x => x.conceptRules)
                    .map(x => handleConceptRuleDeclaration(x))
            )
        }
    }

    const handleConceptRuleDeclaration = async (ast: syntax.ConceptRuleDeclaration): Promise<DocumentSymbol> => {
        let name = await generate(ast.head);
        if (name.startsWith('Define')) {
            name = name.substring(6).trim();
        }
        return {
            name,
            kind: SymbolKind.Struct,
            range: document.getNodeRange(ast),
            selectionRange: document.getNodeRange(ast.head),
            children: [
                await handleTheGraphStructureDeclaration(ast.theGraph),
                ast.theRule ? await handleTheRuleDeclaration(ast.theRule) : null,
                ast.theAction ? await handleTheActionDeclaration(ast.theAction) : null,
            ].filter(Boolean) as DocumentSymbol[]
        }
    }

    const handleTheGraphStructureDeclaration = async (ast: syntax.TheGraphStructureDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Function,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.head),
    })

    const handleTheRuleDeclaration = async (ast: syntax.TheRuleDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Function,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.head),
    })

    const handleTheActionDeclaration = async (ast: syntax.TheActionDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Function,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.head),
    })

    return (await Promise.all(
        document.ast.nodes.map(node => (async () => {
            switch (node.type) {
                case 'NamespaceDeclaration':
                    return await handleNamespaceDeclaration(node);
                case 'RuleWrapperDeclaration':
                    return await handleRuleWrapperDeclaration(node);
                case 'ConceptRuleDeclaration':
                    return await handleConceptRuleDeclaration(node);
                default:
                    return null;
            }
        })())
    )).filter(Boolean) as DocumentSymbol[];
}
