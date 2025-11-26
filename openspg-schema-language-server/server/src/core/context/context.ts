import {Connection} from 'vscode-languageserver';
import {SchemaTextDocument} from "../common/text-document";
import {TextDocuments} from '../common/text-documents';

export class Context {
    public constructor(
        // VSCode Language Server Connection
        public readonly connection: Connection,
        // VSCode Text Documents
        public readonly documents: TextDocuments<SchemaTextDocument>,
    ) {
    }
}
