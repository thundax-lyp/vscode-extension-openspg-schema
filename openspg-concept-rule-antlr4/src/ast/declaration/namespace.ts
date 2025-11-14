import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, NamespaceContext} from '../../antlr4';
import {NamespaceValue} from "./namespace-value";


// namespace: NAMESPACE_KEYWORD namespaceValue;
export class Namespace extends BaseNode {

    type = 'Namespace' as const;

    value: NamespaceValue

    constructor(ctx: NamespaceContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.value = ctx.namespaceValue().accept(visitor)
    }

}
