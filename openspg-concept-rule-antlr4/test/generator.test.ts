import {expect, test} from 'vitest';
import {generate} from '../src';
import {createParse} from "./utils.test";

test('ruleWrapperHead', async () => {
    const node = createParse((parser) => parser.ruleWrapperHead())("`TaxOfRiskApp` / `赌博应用` :")
    expect(await generate(node)).toBe("`TaxOfRiskApp`/`赌博应用`:")
})

test('conceptRuleHead', async () => {
    const node = createParse((parser) => parser.conceptRuleHead())("Define (s: `ProductChain`.`TaxonomyOfCompanyAccident`/`周期性行业头部上市公司停产事故`)-[p: leadTo]->(o: `ProductChain`.`TaxonomyOfIndustryInfluence`/`成本上升`)")
    expect(await generate(node)).toBe("Define (s:`ProductChain`.`TaxonomyOfCompanyAccident`/`周期性行业头部上市公司停产事故`)-[p:leadTo]->(o:`ProductChain`.`TaxonomyOfIndustryInfluence`/`成本上升`)")
})
