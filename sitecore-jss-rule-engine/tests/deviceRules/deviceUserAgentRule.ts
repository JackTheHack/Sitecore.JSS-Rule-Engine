
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '@root/mocks/ruleMocks'
import { RuleEngineContext } from '@src/types/ruleEngine';

test('deviceUserAgentRule', async t => {
    var xml = ruleMocks.deviceUserAgentRuleXml;

    var ruleEngineOptions = {
        requestContext:{
            userAgent: "Chrome" 
        }
    } as RuleEngineContext;

    var result = await parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    ruleEngineOptions = {
        requestContext:{
            userAgent: "Firefox" 
        }
    } as RuleEngineContext;

    var result =  await parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});