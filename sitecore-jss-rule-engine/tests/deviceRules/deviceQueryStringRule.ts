
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '../../mocks/ruleMocks'

test('websiteNameRule', t => {
    var xml = ruleMocks.websiteNameRuleXml;

    let ruleEngineOptions =  {
        sitecoreContext: {
            siteName: "Headless" 
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);


    let ruleEngineOptions2 = {
        sitecoreContext:{
            siteName: "Random" 
        }
    };

    var result = parseAndRun(xml, ruleEngineOptions2);
    t.false(result);
});