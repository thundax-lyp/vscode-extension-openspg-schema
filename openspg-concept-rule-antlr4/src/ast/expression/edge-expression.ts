import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, EdgeExpressionContext} from "../../antlr4";
import {Identifier} from "../literal";
import {LabelPropertyList} from "../expression";


// edgeExpression: vertexFrom edgeDirection vertexTo (LBRACKET labelPropertyList RBRACKET)? (REPEAT_KEYWORD repeatTime)? (AS_KEYWORD edgeName)?;
// edgeDirection: RIGHT_ARROW | BOTH_ARROW;
// repeatTime : LPARENTH lowerBound COMMA upperBound RPARENTH;
// vertexFrom : vertexName;
// vertexTo : vertexName;
// edgeName : identifier;

export class EdgeExpression extends BaseNode {
    type = 'EdgeExpression' as const;

    vertexFrom: Identifier
    vertexTo: Identifier
    direction: string
    labelPropertyList: LabelPropertyList | null = null
    repeatTime: string | null = null
    alias: string | null = null

    constructor(ctx: EdgeExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.vertexFrom = ctx.vertexFrom().vertexName().identifier().accept(visitor)
        this.vertexTo = ctx.vertexTo().vertexName().identifier().accept(visitor)
        this.direction = ctx.edgeDirection().getText()
        this.labelPropertyList = ctx.labelPropertyList()?.accept(visitor) ?? null
        this.repeatTime = ctx.repeatTime()?.getText() ?? null
        this.alias = ctx.edgeName()?.getText() ?? null
    }
}

