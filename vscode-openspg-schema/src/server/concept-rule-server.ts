import { ProposedFeatures, createConnection } from "vscode-languageserver/node";
import { listen } from "openspg-concept-rule-language-server";

const connection = createConnection(ProposedFeatures.all);

listen(connection);
