
import test from 'ava'

import * as ruleMocks from '@root/mocks/ruleMocks'
import { parseAndRun } from '@root/tests/_testHelpers';
import { sitecoreContextMockBuilder } from '@root/mocks/itemMockBuilder';


test('itemTemplateRule', async t => {
    var xml = ruleMocks.itemTemplateRuleXml;
    
    var itemMock1 = 
        sitecoreContextMockBuilder("item1", "item1")
        .template("Template", "B7F529E8-4D15-41A4-8D0F-AC987B4AA3E6")
        .getInstance();

    let ruleEngineOptions1 = {
        sitecoreContext: itemMock1
    };

    var result = await parseAndRun(xml, ruleEngineOptions1);
    t.true(result);

    var itemMock2 = 
        sitecoreContextMockBuilder("item1", "item1")
        .template("WrongTemplate", "WrongValue")
        .getInstance();

    let ruleEngineOptions2 = {
        sitecoreContext: itemMock2
    };

    var result = await parseAndRun(xml, ruleEngineOptions2);
    t.false(result);
});