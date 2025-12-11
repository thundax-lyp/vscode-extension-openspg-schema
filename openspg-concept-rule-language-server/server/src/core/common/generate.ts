import * as ruleSyntax from "openspg-concept-rule-antlr4";

export const generate = async (ast: ruleSyntax.SyntaxNode, options: ruleSyntax.GenerateOptions = {}): Promise<string> => {
    return ruleSyntax.generate(ast, {
        ...options,
        plugins: [{
            languages: ruleSyntax.languages,
            parsers: ruleSyntax.parsers,
            printers: ruleSyntax.printers,
        }],
    })
};
