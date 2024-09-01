
import test from 'ava'

import * as ruleMocks from '@root/mocks/ruleMocks'
import { parseAndRun } from '@root/tests/_testHelpers';
import { sitecoreContextMockBuilder } from '@root/mocks/itemMockBuilder';


test('fieldComparesToRule', async t => {
    var xml = ruleMocks.fieldComparesToRuleXml;
    
    var itemMock1 = 
        sitecoreContextMockBuilder("item1", "item1")
        .fieldValue("Title", "Specials")
        .getInstance();

    let ruleEngineOptions1 = {
        sitecoreContext: itemMock1
    };

    var result = await parseAndRun(xml, ruleEngineOptions1);
    t.true(result);

    var itemMock2 = 
        sitecoreContextMockBuilder("item1", "item1")
        .fieldValue("Title", "SomeValue")
        .getInstance();

    let ruleEngineOptions2 = {
        sitecoreContext: itemMock2
    };

    var result = await parseAndRun(xml, ruleEngineOptions2);
    t.false(result);
});