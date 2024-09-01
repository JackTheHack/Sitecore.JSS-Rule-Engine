
import test from 'ava'

import { parseAndRun} from '../_testHelpers'


import * as ruleMocks from '@root/mocks/ruleMocks'

test('websiteNameRule', async t => {
    var xml = ruleMocks.websiteNameRuleXml;

    var ruleEngineOptions = {
        sitecoreContext:{
            siteName: "Headless" 
        }
    };

    var result = await parseAndRun(xml, ruleEngineOptions);
    t.true(result);


    ruleEngineOptions = {
        sitecoreContext:{
            siteName: "Random" 
        }
    };

    var result = await parseAndRun(xml, ruleEngineOptions);
    t.false(result);
});