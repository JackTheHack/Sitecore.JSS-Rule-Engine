
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '@root/mocks/ruleMocks'

test('requestCookieExistsRule', async t => {
    var xml = ruleMocks.requestCookieExistsRuleXml;

    let cookiesArray = new Map<string, string>();
    cookiesArray.set("PromotionCookie", "PromotionCookie");

    let ruleEngineOptions = {
        requestContext:{
            cookies: cookiesArray 
        }
    };
    var result = await parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    cookiesArray = new Map<string, string>();
    cookiesArray.set("Empty", "Test")

    let ruleEngineOptions2 = {
        requestContext:{
            cookies: cookiesArray
        }
    };

    var result = await parseAndRun(xml, ruleEngineOptions2);
    t.false(result);
});