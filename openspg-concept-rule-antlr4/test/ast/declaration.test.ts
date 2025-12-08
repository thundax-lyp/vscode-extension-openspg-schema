import {expect, test} from 'vitest';
import {createParse} from '../utils.test';

test('namespace', () => {
    expect(createParse((parser) => parser.namespaceDeclaration())(`namespace Sample`)).toMatchObject({
        type: 'NamespaceDeclaration',
        variable: 'Sample'
    });
    expect(createParse((parser) => parser.namespaceDeclaration())(`namespace "Sample"`)).toMatchObject({
        type: 'NamespaceDeclaration',
        variable: '"Sample"'
    });
    expect(createParse((parser) => parser.namespaceDeclaration())(`namespace 'Sample'`)).toMatchObject({
        type: 'NamespaceDeclaration',
        variable: '\'Sample\''
    });
});


test('ruleWrapperHead', () => {
    expect(createParse((parser) => parser.ruleWrapperHead())("`TaxOfRiskApp`/`赌博应用` :")).toMatchObject({
        type: 'RuleWrapperHead',
    });

    expect(createParse((parser) => parser.ruleWrapperHead())("`TaxOfRiskApp`/`赌博应用` : `TaxOfRiskApp`/`赌博应用2`")).toMatchObject({
        type: 'RuleWrapperHead',
    });
});


test('conceptRuleDeclaration', () => {
    const code = `
        Define (s:Person)-[p:belongTo]->(o:\`TaxOfRiskUser\`/\`赌博App开发者\`) {
            GraphStructure {}
        }
    `
    expect(createParse((parser) => parser.conceptRuleDeclaration())(code)).toMatchObject({
        type: 'ConceptRuleDeclaration',
    });
});

test('theGraphStructureDeclaration', () => {
    const code = `
        Structure {
            (s)-[:developed]->(app:\`TaxOfRiskApp\`/\`赌博应用\`)
        }
    `
    expect(createParse((parser) => parser.theGraphStructureDeclaration())(code)).toMatchObject({
        type: 'TheGraphStructureDeclaration',
    });
});

test('theRuleDeclaration', () => {
    const code = `
        Constraint {
            R1("风险标记为赌博"): s.riskMark like "%赌博%"
        }
    `
    expect(createParse((parser) => parser.theRuleDeclaration())(code)).toMatchObject({
        type: 'TheRuleDeclaration',
        head: 'Constraint',
    });
});
