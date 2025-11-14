import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, DefineVertexContext} from "../../antlr4";
import {Identifier} from "../literal";
import {LabelPropertyList} from "../expression";

// defineVertex : vertexName (COMMA vertexName)* (LBRACKET labelPropertyList RBRACKET)?;
export class DefineVertex extends BaseNode {
    type = 'DefineVertex' as const;

    vertexNames: Identifier[]
    labelPropertyList: LabelPropertyList

    constructor(ctx: DefineVertexContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.vertexNames = ctx.vertexName().map(x => x.accept(visitor))
        this.labelPropertyList = ctx.labelPropertyList()?.accept(visitor)
    }
}
