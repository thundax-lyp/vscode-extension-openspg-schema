import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, NamespaceContext} from '../../antlr4';


export class Namespace extends BaseNode {

    type = 'Namespace' as const;

    value: string

    constructor(ctx: NamespaceContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.value = ctx.namespaceValue().getText()
    }

}
