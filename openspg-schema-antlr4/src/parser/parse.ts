import {SchemaASTBuilder} from '../ast/builder';
import {SourceUnit, SyntaxNode} from '../ast';
import {CharStream, CommonTokenStream, ParseTree, SchemaLexer, SchemaParser} from '../antlr4';
import {SchemaErrorListener, ParseError} from './error-listener';

export interface ParseOptions {
    tolerant?: boolean;
    selector?: (parser: SchemaParser) => ParseTree;
}

export const defaultParseOption: ParseOptions = {
    tolerant: false,
    selector: (parser) => parser.sourceUnit(),
};

export const parse = <T extends SyntaxNode = SourceUnit>(
    source: string,
    _options?: ParseOptions,
): T => {
    let syntaxTree: T;
    const options: ParseOptions = Object.assign({}, defaultParseOption, _options);
    const listener = new SchemaErrorListener();

    try {
        const input = CharStream.fromString(source);
        const lexer = new SchemaLexer(input);
        const token = new CommonTokenStream(lexer);
        const parser = new SchemaParser(token);
        parser.removeErrorListeners();
        parser.addErrorListener(listener);

        const visitor = new SchemaASTBuilder();
        const parseTree = options.selector!(parser);
        syntaxTree = parseTree.accept(visitor)! as T;

    } catch (error) {
        if (error instanceof ParseError) {
        } else {
            listener.errors.push(new ParseError((error as any).message || 'unknown error'));
        }
    }

    if (!options.tolerant) {
        listener.throws();
    }

    return syntaxTree!;
};
