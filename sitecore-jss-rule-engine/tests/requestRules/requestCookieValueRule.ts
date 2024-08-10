
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '../../mocks/ruleMocks'

test('requestCookieValueRule', t => {
    var xml = ruleMocks.requestCookieValueRuleXml;

    let cookiesArray = new Map<string, string>();
    cookiesArray.set("PromotionCookie", "Christmas");

    let ruleEngineOptions = {
        requestContext:{
            cookies: cookiesArray 
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    cookiesArray = new Map<string, string>();
    cookiesArray.set("PromotionCookie","Test");

    let ruleEngineOptions2 = {
        requestContext:{
            cookies: cookiesArray
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions2);
    t.false(result);

    cookiesArray = new Map<string, string>();
    cookiesArray.set("Empty", "Test")

    let ruleEngineOptions3 = {
        requestContext:{
            cookies: cookiesArray
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions3);
    t.false(result);
});