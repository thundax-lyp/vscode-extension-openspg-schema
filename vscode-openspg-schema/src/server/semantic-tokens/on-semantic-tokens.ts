import {SemanticTokensBuilder} from 'vscode-languageserver';
import {Context, OnSemanticTokens} from '../context';
import {traverse} from "openspg-schema-antlr4";

enum TokenTypes {
    comment = 0,
    keyword = 1,
    string = 2,
    number = 3,
    regexp = 4,
    type = 5,
    class = 6,
    interface = 7,
    enum = 8,
    typeParameter = 9,
    function = 10,
    member = 11,
    property = 12,
    variable = 13,
    parameter = 14,
    lambdaFunction = 15,
    _ = 16
}

enum TokenModifiers {
    default = 0,
    deprecated = 1,
    _ = 2,
}

export const onSemanticTokens = (ctx: Context): OnSemanticTokens => async ({textDocument}) => {
    const builder = new SemanticTokensBuilder();

    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return builder.build();
    }

    ctx.connection.console.log('='.repeat(40));
    traverse(document.ast, (path) => {
        ctx.connection.console.log(path.node.type);
        const {line, column} = path.node.location.start;
        const tokenType = TokenTypes.comment;
        const tokenModifiers = TokenModifiers.default;
        builder.push(line, column, path.node.range.length, TokenTypes.comment, tokenModifiers)
    })
    ctx.connection.console.log('-'.repeat(40));

    return builder.build();
}
