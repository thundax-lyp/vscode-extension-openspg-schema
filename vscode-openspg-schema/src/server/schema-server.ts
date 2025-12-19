import {ProposedFeatures, createConnection} from 'vscode-languageserver/node';
import {listen} from 'openspg-schema-language-server';

const connection = createConnection(ProposedFeatures.all);

listen(connection);
