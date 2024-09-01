
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '@root/mocks/ruleMocks'

test('requestReferralRule', async t => {
    var xml = ruleMocks.requestReferrerRuleXml;

    var ruleEngineOptions = {
        requestContext:{
            referral: "https://www.google.com" 
        }
    };
    var result = await parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    var ruleEngineOptions = {
        requestContext:{
            referral: "https://www.test.com" 
        }
    };
    var result = await parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});