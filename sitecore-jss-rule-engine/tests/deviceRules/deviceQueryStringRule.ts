
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '@root/mocks/ruleMocks'

test('deviceQueryStringRule', async t => {
    var xml = ruleMocks.deviceQueryStringRuleXml;

    let ruleEngineOptions =  {
        requestContext: {
            queryString: "p=specials" 
        }
    };

    var result = await parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    let ruleEngineOptions2 =  {
        requestContext: {
            queryString: "p=test" 
        }
    };

    var result = await parseAndRun(xml, ruleEngineOptions2);
    t.false(result);
});