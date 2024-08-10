
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '../../mocks/ruleMocks'

test('websiteNameRule', t => {
    var xml = ruleMocks.websiteNameRuleXml;

    var ruleEngineOptions = {
        sitecoreContext:{
            siteName: "Headless" 
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);


    ruleEngineOptions = {
        sitecoreContext:{
            siteName: "Random" 
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});