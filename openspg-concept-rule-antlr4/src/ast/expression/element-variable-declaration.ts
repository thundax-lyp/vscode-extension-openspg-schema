import {BaseNodeString} from '../base';


// elementVariableDeclaration : elementVariable;
// elementVariable : identifier;
export class ElementVariableDeclaration extends BaseNodeString {

    type = 'ElementVariableDeclaration' as const;

}
