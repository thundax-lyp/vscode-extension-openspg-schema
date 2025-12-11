import {ProposedFeatures, createConnection} from 'vscode-languageserver/node';
import {listen} from './server/language-server';

const connection = createConnection(ProposedFeatures.all);

listen(connection);
