import {Diagnostic} from "vscode-languageserver-types";

import {SchemaTextDocument} from "../../common";

export interface Validator {

    validate: (document: SchemaTextDocument) => Diagnostic[]

}

