import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, ElementPatternDeclarationAndFillerContext} from '../../antlr4';
import {ElementVariableDeclaration} from "./element-variable-declaration";
import {ElementLookup} from "./element-lookup";
import {ElementPatternWhereClause} from "./element-pattern-where-clause";


export class ElementPatternDeclarationAndFiller extends BaseNode {

    type = 'ElementPatternDeclarationAndFiller' as const;

    variable: ElementVariableDeclaration | null = null
    lookup: ElementLookup | null = null
    whereClause: ElementPatternWhereClause | null = null

    constructor(ctx: ElementPatternDeclarationAndFillerContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.elementVariableDeclaration()?.accept(visitor) ?? null
        this.lookup = ctx.elementLookup()?.accept(visitor) ?? null
        this.whereClause = ctx.elementPatternWhereClause()?.accept(visitor) ?? null
    }

}
