
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '@root/mocks/ruleMocks'

test('requestParameterExistsRule', async t => {
    var xml = ruleMocks.requestParamExistsRuleXml;

    var ruleEngineOptions = {
        requestContext:{
            url: "http://testrequest.com?campaignId=test123"
        }
    };
    var result = await parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    var ruleEngineOptions = {
        requestContext:{
            url: "http://testrequest.com?param=specials"
        }
    };
    var result = await parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});