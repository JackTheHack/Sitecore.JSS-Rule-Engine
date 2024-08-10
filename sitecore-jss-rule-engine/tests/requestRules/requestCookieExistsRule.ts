
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '../../mocks/ruleMocks'

test('requestCookieExistsRule', t => {
    var xml = ruleMocks.requestCookieExistsRuleXml;

    let cookiesArray = new Map<string, string>();
    cookiesArray.set("PromotionCookie", "PromotionCookie");

    let ruleEngineOptions = {
        requestContext:{
            cookies: cookiesArray 
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    cookiesArray = new Map<string, string>();
    cookiesArray.set("Empty", "Test")

    let ruleEngineOptions2 = {
        requestContext:{
            cookies: cookiesArray
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions2);
    t.false(result);
});