
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '@root/mocks/ruleMocks'

test('requestReferralRule', t => {
    var xml = ruleMocks.requestReferrerRuleXml;

    var ruleEngineOptions = {
        requestContext:{
            referral: "https://www.google.com" 
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    var ruleEngineOptions = {
        requestContext:{
            referral: "https://www.test.com" 
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});