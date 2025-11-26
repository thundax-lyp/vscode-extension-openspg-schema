import {ProposedFeatures, createConnection} from 'vscode-languageserver/node';
import {listen} from './core/language-server';

const connection = createConnection(ProposedFeatures.all);

listen(connection);
