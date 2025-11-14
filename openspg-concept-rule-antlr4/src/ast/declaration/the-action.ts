import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheActionContext} from "../../antlr4";
import {AddNode} from "./add-node";
import {AddEdge} from "./add-edge";

export type TheActionNode =
    | AddEdge
    | AddNode

// theAction : ACTION_KEYWORD LBRACE actionBody* RBRACE;
// actionBody : addNode | addEdge;
export class TheAction extends BaseNode {
    type = 'TheAction' as const;

    nodes: TheActionNode[]

    constructor(ctx: TheActionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.nodes = ctx.actionBody().map(x => x.accept(visitor))
    }
}
