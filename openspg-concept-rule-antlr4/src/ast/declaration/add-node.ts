import {BaseNode} from "../base";
import {Identifier} from "../literal";
import {AddNodeContext, ConceptRuleParserVisitor} from "../../antlr4";
import {AddType} from "./add-type";
import {AddProps} from "./add-props";

// addNode : (identifier EQ)? ADD_NODE_KEYWORD LPARENTH addType COMMA addProps RPARENTH;
export class AddNode extends BaseNode {
    type = 'AddNode' as const;

    identifier: Identifier | null = null
    addType: AddType
    addProps: AddProps

    constructor(ctx: AddNodeContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.identifier = ctx.identifier()?.accept(visitor) ?? null
        this.addType = ctx.addType().accept(visitor)
        this.addProps = ctx.addProps().accept(visitor)
    }
}

