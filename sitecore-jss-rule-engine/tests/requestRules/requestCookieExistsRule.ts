
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '../../mocks/ruleMocks'

test('requestCookieExistsRule', t => {
    var xml = ruleMocks.requestCookieExistsRuleXml;

    let cookiesArray = new Map<string, string>();
    cookiesArray.set("PromotionCookie", "PromotionCookie");

    var ruleEngineOptions = {
        requestContext:{
            cookies: cookiesArray 
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    cookiesArray = new Map<string, string>();
    cookiesArray.set("Empty", "Test")

    ruleEngineOptions = {
        requestContext:{
            cookies: cookiesArray
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});