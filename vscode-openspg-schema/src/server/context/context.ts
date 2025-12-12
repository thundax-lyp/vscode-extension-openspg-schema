import {Connection} from 'vscode-languageserver';
import {SchemaTextDocument, TextDocuments} from "../common";

export class Context {
    public constructor(
        // VSCode Language Server Connection
        public readonly connection: Connection,
        // VSCode Text Documents
        public readonly documents: TextDocuments<SchemaTextDocument>,
    ) {
    }
}
