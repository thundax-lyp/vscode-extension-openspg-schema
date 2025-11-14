import {BaseNodeString} from '../base';
import {BasicPropertyValueContext, SchemaParserVisitor} from "../../antlr4";

// structureAlias : (DEFINITION_IDENTIFIER | DEFINITION_STRING_LITERAL)+ ;
export class StructureAlias extends BaseNodeString {

    type = 'StructureAlias' as const;

    constructor(ctx: BasicPropertyValueContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = (ctx.children || []).map(x => x.getText()).join(' ')
    }

}
