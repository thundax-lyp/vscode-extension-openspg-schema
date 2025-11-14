import {expect, test} from 'vitest';
import {createParse} from '../utils.test';

test('namespace', () => {
    expect(createParse((parser) => parser.namespace())(`namespace Sample`)).toMatchObject({
        type: 'Namespace',
        value: 'Sample'
    });
    expect(createParse((parser) => parser.namespace())(`namespace "Sample"`)).toMatchObject({
        type: 'Namespace',
        value: '"Sample"'
    });
    expect(createParse((parser) => parser.namespace())(`namespace 'Sample'`)).toMatchObject({
        type: 'Namespace',
        value: '\'Sample\''
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


test('theDefineStructure', () => {
    const code = `
        Define (s:Person)-[p:belongTo]->(o:\`TaxOfRiskUser\`/\`赌博App开发者\`) {
            GraphStructure {}
        }
    `
    expect(createParse((parser) => parser.theDefineStructure())(code)).toMatchObject({
        type: 'TheDefineStructure',
    });
});

test('theGraphStructure', () => {
    const code = `
        Structure {
            (s)-[:developed]->(app:\`TaxOfRiskApp\`/\`赌博应用\`)
        }
    `
    expect(createParse((parser) => parser.theGraphStructure())(code)).toMatchObject({
        type: 'TheGraphStructure',
    });
});

test('theRule', () => {
    const code = `
        Constraint {
            R1("风险标记为赌博"): s.riskMark like "%赌博%"
        }
    `
    expect(createParse((parser) => parser.theRule())(code)).toMatchObject({
        type: 'TheRule',
        head: 'Constraint',
    });
});
