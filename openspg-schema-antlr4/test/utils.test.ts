import { test } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { CharStream, CommonTokenStream, ParserRuleContext, SchemaLexer, SchemaParser } from "../src";

import { SyntaxNode } from "../src";
import { serialize } from "../src";
import { BaseNodeString } from "../src";
import { schemaASTBuilder } from "../src/ast/builder";

export const load = (name: string) =>
    fs.readFileSync(path.join(__dirname, `./__files__/${name}`), { encoding: "utf-8" }).toString();

export const format = (ast: SyntaxNode) =>
    serialize(ast, (p) => {
        if (p.node instanceof BaseNodeString) {
            return p.node.text;
        }
        return p.node;
    });

export const parse = (
    input: string,
    callback: (parser: SchemaParser) => ParserRuleContext = (parser) => parser.sourceUnit(),
    afterParse: (ast: SyntaxNode) => any = format
) => {
    const lexer = new SchemaLexer(CharStream.fromString(input));
    const parser = new SchemaParser(new CommonTokenStream(lexer));
    const tree = callback(parser);
    const ast = tree.accept(schemaASTBuilder)!;
    return afterParse(ast);
};

export const createParse = (
    callback: (parser: SchemaParser) => ParserRuleContext = (parser) => parser.sourceUnit(),
    afterParse: (ast: SyntaxNode) => any = format
) => {
    return (input: string) => parse(input, callback, afterParse);
};

export const createLog = (callback: (parser: SchemaParser) => ParserRuleContext = (parser) => parser.sourceUnit()) => {
    return (input: string) =>
        parse(input, callback, (ast) => {
            const newAST = serialize(ast, (p) => {
                if (p.node instanceof BaseNodeString) {
                    return p.node.text;
                }
                return p.node;
            });
            console.log(newAST);
            return newAST;
        });
};

export const visitor = schemaASTBuilder;

test("utils", () => {});
