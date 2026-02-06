import * as syntax from "openspg-concept-rule-antlr4";

export const generate = async (ast: syntax.SyntaxNode, options: syntax.GenerateOptions = {}): Promise<string> => {
    return syntax.generate(ast, {
        ...options,
        plugins: [
            {
                languages: syntax.languages,
                parsers: syntax.parsers,
                printers: syntax.printers
            }
        ]
    });
};
