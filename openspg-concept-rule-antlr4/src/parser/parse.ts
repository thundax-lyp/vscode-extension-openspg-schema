import {ConceptRuleASTBuilder} from '../ast/builder';
import {SourceUnit, SyntaxNode} from '../ast';
import {CharStream, CommonTokenStream, ConceptRuleLexer, ConceptRuleParser, ParseTree} from '../antlr4';
import {ConceptRuleErrorListener, ParseError} from './error-listener';

export interface ParseOptions {
    tolerant?: boolean;
    selector?: (parser: ConceptRuleParser) => ParseTree;
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
    const listener = new ConceptRuleErrorListener();

    try {
        const input = CharStream.fromString(source);
        const lexer = new ConceptRuleLexer(input);
        const token = new CommonTokenStream(lexer);
        const parser = new ConceptRuleParser(token);
        parser.removeErrorListeners();
        parser.addErrorListener(listener);

        const visitor = new ConceptRuleASTBuilder();
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
