
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '../../mocks/ruleMocks'

test('deviceQueryStringRule', t => {
    var xml = ruleMocks.deviceQueryStringRuleXml;

    let ruleEngineOptions =  {
        requestContext: {
            queryString: "p=specials" 
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);

    let ruleEngineOptions2 =  {
        requestContext: {
            queryString: "p=test" 
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions2);
    t.false(result);
});