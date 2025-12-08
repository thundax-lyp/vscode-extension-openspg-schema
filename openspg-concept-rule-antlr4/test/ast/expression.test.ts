import {expect, test} from 'vitest';
import {createParse} from '../utils.test';

test('assignmentExpression', () => {
    expect(createParse((parser) => parser.assignmentExpression())("name=value")).toMatchObject({
        type: 'AssignmentExpression',
        variable: "name",
        expressionSet: "value",
    });
    expect(createParse((parser) => parser.assignmentExpression())("name=`value value2`")).toMatchObject({
        type: 'AssignmentExpression',
        variable: "name",
        expressionSet: "`value value2`",
    });
});


test('conceptName', () => {
    expect(createParse((parser) => parser.conceptName())("concept/`instanceId`")).toMatchObject({
        type: 'ConceptName',
        conceptType: {
            "identifiers": ["concept"],
        },
        instanceId: "`instanceId`"
    });

    expect(createParse((parser) => parser.conceptName())("concept.prop/`instanceId`")).toMatchObject({
        type: 'ConceptName',
        conceptType: {
            "identifiers": ["concept", "prop"],
        },
        instanceId: "`instanceId`"
    });
});

test('labelName', () => {
    expect(createParse((parser) => parser.labelName())("`TaxOfRiskApp`")).toMatchObject({
        type: 'LabelName',
    });

    expect(createParse((parser) => parser.labelName())("`TaxOfRiskApp`.`Version`")).toMatchObject({
        type: 'LabelName',
    });

    expect(createParse((parser) => parser.labelName())("`TaxOfRiskApp`/`赌博应用`")).toMatchObject({
        type: 'LabelName',
    });

    expect(createParse((parser) => parser.labelName())("`TaxOfRiskApp`/`赌博应用`+`TaxOfRiskApp`/`赌博应用`")).toMatchObject({
        type: 'LabelName',
    });
});

test('labelExpression', () => {
    expect(createParse((parser) => parser.labelExpression())("`TaxOfRiskApp`/`赌博应用`:")).toMatchObject({
        type: 'LabelExpression',
    });

    expect(createParse((parser) => parser.labelExpression())("`TaxOfRiskApp`.`Version`|`TaxOfRiskApp`/`赌博应用`")).toMatchObject({
        type: 'LabelExpression',
    });
});
