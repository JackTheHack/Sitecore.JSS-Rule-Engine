
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '@root/mocks/ruleMocks'

test('requestParameterValueRule', async t => {
    var xml = ruleMocks.requestParameterValueRuleXml;

    var ruleEngineOptions = {
        requestContext:{
            url: "http://testrequest.com?campaignId=test123"
        }
    };
    var result = await parseAndRun(xml, ruleEngineOptions);
    t.false(result);

    var ruleEngineOptions = {
        requestContext:{
            url: "http://testrequest.com?campaignId=specials"
        }
    };
    var result = await parseAndRun(xml, ruleEngineOptions);
    t.true(result);
});