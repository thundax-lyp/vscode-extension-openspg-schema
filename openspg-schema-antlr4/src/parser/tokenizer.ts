import { CharStream, SchemaLexer } from "../antlr4";
import { Position } from "../ast";
import { ParseError, SchemaErrorListener } from "./error-listener";

export type SyntaxTokenType = (typeof SchemaLexer.symbolicNames)[number];

export interface SyntaxToken {
    text: string;
    type: SyntaxTokenType;
    range: [number, number];
    position: Position;
}

export interface TokenizerOptions {
    tolerant?: boolean;
}

export const defaultTokenizerOption: TokenizerOptions = {
    tolerant: false
};

export const tokenizer = (source: string, _options: TokenizerOptions = {}): SyntaxToken[] => {
    let tokens: SyntaxToken[] = [];
    const options: TokenizerOptions = Object.assign({}, defaultTokenizerOption, _options);
    const listener = new SchemaErrorListener();

    try {
        const input = CharStream.fromString(source);
        const lexer = new SchemaLexer(input);
        lexer.removeErrorListeners();
        lexer.addErrorListener(listener);

        tokens = lexer.getAllTokens().map((token) => {
            return {
                text: token.text!,
                type: SchemaLexer.symbolicNames[token.type]!,
                range: [token.start, token.stop],
                position: Position.create(token.line, token.column)
            };
        });
    } catch (error) {
        if (error instanceof ParseError) {
        } else {
            listener.errors.push(new ParseError((error as any).message || "unknown error"));
        }
    }

    if (!options.tolerant) {
        listener.throws();
    }
    return tokens;
};
