
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '../../mocks/ruleMocks'

test('requestParameterExistsRule', t => {
    var xml = ruleMocks.requestParamExistsRuleXml;

    var ruleEngineOptions = {
        requestContext:{
            url: "http://testrequest.com?campaignId=test123"
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    var ruleEngineOptions = {
        requestContext:{
            url: "http://testrequest.com?param=specials"
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});