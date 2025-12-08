import {BaseNode} from "../base";
import {Identifier} from "../literal";
import {AddNodeFunctionContext, ConceptRuleParserVisitor} from "../../antlr4";
import {TypeFunctionParam} from "./type-function-param";
import {ObjectFunctionParam} from "./object-function-param";

// addNodeFunction : (identifier EQ)? ADD_NODE_KEYWORD LPARENTH typeFunctionParam COMMA objectFunctionParam RPARENTH;
export class AddNodeFunction extends BaseNode {
    type = 'AddNodeFunction' as const;

    variable: Identifier | null = null
    typeParam: TypeFunctionParam
    props: ObjectFunctionParam

    constructor(ctx: AddNodeFunctionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.identifier()?.accept(visitor) ?? null
        this.typeParam = ctx.typeFunctionParam().accept(visitor)
        this.props = ctx.objectFunctionParam().accept(visitor)
    }
}

