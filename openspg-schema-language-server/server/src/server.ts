import {ProposedFeatures, createConnection} from 'vscode-languageserver/node';
import {listen} from './core';

const connection = createConnection(ProposedFeatures.all);

listen(connection);
