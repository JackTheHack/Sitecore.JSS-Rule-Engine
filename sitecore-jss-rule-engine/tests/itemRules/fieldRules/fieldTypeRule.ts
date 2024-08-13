
import test from 'ava'

import * as ruleMocks from '@root/mocks/ruleMocks'
import { parseAndRun } from '@root/tests/_testHelpers';


test('fieldTypeRule', t => {
    var xml = ruleMocks.fieldTypeRuleXml;

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