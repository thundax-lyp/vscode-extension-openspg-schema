import {expect, test} from 'vitest';
import {parse} from '../src';
import {createSelector, querySelector, querySelectorAll, traverse, visit,} from '../src';

const code = `
// SPDX-License-Identifier: MIT
namespace Sample

\`TaxOfRiskApp\`/\`赌博应用\`:
    rule: [[
        Define (s:App)-[p:belongTo]->(o:\`TaxOfRiskApp\`/\`赌博应用\`) {
            Structure {
                (s)
            }
            Constraint {
                R1("风险标记为赌博"): s.riskMark like "%赌博%"
            }
        }
    ]]


\`TaxOfRiskUser\`/\`赌博App开发者\`:
    rule: [[
        Define (s:Person)-[p:belongTo]->(o:\`TaxOfRiskUser\`/\`赌博App开发者\`) {
            Structure {
                (s)-[:developed]->(app:\`TaxOfRiskApp\`/\`赌博应用\`)
            }
            Constraint {

            }
        }
    ]]

\`TaxOfRiskUser\`/\`赌博App老板\`:
    rule: [[
        Define (s:Person)-[p:belongTo]->(o:\`TaxOfRiskUser\`/\`赌博App老板\`) {
            Structure {
                (s)-[:release]->(a:\`TaxOfRiskApp\`/\`赌博应用\`),
                (u:Person)-[:developed]->(a),
                (s)-[:fundTrans]->(u)
            }
            Constraint {

            }
        }
    ]]
    `

test('traverse', () => {
    const ast = parse(code);

    const enterNames: string[] = [];
    const exitNames: string[] = [];

    visit(ast, {
        enter: ({node}) => {
            if (node.type === 'NamespaceDeclaration' || node.type === 'RuleWrapperDeclaration') {
                enterNames.push(node.type);
            }
        },
        exit: ({node}) => {
            if (node.type === 'NamespaceDeclaration' || node.type === 'RuleWrapperDeclaration') {
                exitNames.push(node.type);
            }
        },
    });

    expect(enterNames).toEqual(['NamespaceDeclaration', 'RuleWrapperDeclaration', 'RuleWrapperDeclaration', 'RuleWrapperDeclaration']);
    expect(exitNames).toEqual(['NamespaceDeclaration', 'RuleWrapperDeclaration', 'RuleWrapperDeclaration', 'RuleWrapperDeclaration']);

    traverse(ast, (path) => {
        if (path.node.type === 'RuleWrapperDeclaration') {
            expect(path.getFlattenParents().length).toBe(1);
            expect(path.getFlattenParents(1).length).toBe(1);
        }
    });

});

test('selector', () => {
    const ast = parse(code);

    expect(querySelector(ast, createSelector('*'))!.node).toMatchObject({type: 'SourceUnit'});
    expect(querySelectorAll(ast, createSelector('RuleWrapperDeclaration')).length).toBe(3);

    expect(
        querySelectorAll(ast, createSelector('NamespaceDeclaration')),
    ).toMatchObject([{
        node: {
            type: 'NamespaceDeclaration', variable: {
                text: 'Sample'
            }
        }
    }]);
});
