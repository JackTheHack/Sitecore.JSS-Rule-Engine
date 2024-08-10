
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '../../mocks/ruleMocks'
import { RuleEngineContext } from '../../src/types/ruleEngine';

test('deviceUserAgentRule', t => {
    var xml = ruleMocks.deviceUserAgentRuleXml;

    var ruleEngineOptions = {
        requestContext:{
            userAgent: "Chrome" 
        }
    } as RuleEngineContext;

    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    ruleEngineOptions = {
        requestContext:{
            userAgent: "Firefox" 
        }
    } as RuleEngineContext;

    var result = parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});