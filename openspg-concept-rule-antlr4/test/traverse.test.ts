import {expect, test} from 'vitest';
import {parse} from '../src';
import {createSelector, querySelector, querySelectorAll, serialize, traverse, visit,} from '../src';

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
            if (node.type === 'Namespace' || node.type === 'RuleWrapper') {
                enterNames.push(node.type);
            }
        },
        exit: ({node}) => {
            if (node.type === 'Namespace' || node.type === 'RuleWrapper') {
                exitNames.push(node.type);
            }
        },
    });

    expect(enterNames).toEqual(['Namespace', 'RuleWrapper', 'RuleWrapper', 'RuleWrapper']);
    expect(exitNames).toEqual(['Namespace', 'RuleWrapper', 'RuleWrapper', 'RuleWrapper']);

    // @ts-expect-error
    expect(serialize(ast, (p) => ({...p.node, _flag: true}))._flag).toEqual(true);

    traverse(ast, (path) => {
        if (path.matches({text: 'greet'})) {
            expect(path.node.type).toBe('Identifier');
        }
    });

    traverse(ast, (path) => {
        if (path.node.type === 'RuleWrapper') {
            expect(path.getFlattenParents().length).toBe(1);
            expect(path.getFlattenParents(1).length).toBe(1);
        }
    });

    // expect(visitNodes(ast, (p) => p.depth === 1).length).toBe(2);
});

test('selector', () => {
    const ast = parse(code);

    expect(querySelector(ast, createSelector('*'))!.node).toMatchObject({type: 'SourceUnit'});
    expect(querySelectorAll(ast, createSelector('RuleWrapper')).length).toBe(3);

    expect(
        querySelectorAll(ast, createSelector('Namespace')),
    ).toMatchObject([{
        node: {
            type: 'Namespace', value: {
                text: 'Sample'
            }
        }
    }]);
    // expect(
    //     querySelectorAll(ast, createSelector('ContractDefinition').inside('Identifier')),
    // ).toMatchObject([
    //     {node: {type: 'Identifier', name: 'HelloWorld'}},
    //     {node: {type: 'Identifier', name: 'greet'}},
    // ]);
    // expect(
    //     query(ast, createSelector('ContractDefinition').inside('Identifier'), {
    //         queryAll: true,
    //         order: 'desc',
    //     }),
    // ).toMatchObject([
    //     {node: {type: 'Identifier', name: 'greet'}},
    //     {node: {type: 'Identifier', name: 'HelloWorld'}},
    // ]);
});
