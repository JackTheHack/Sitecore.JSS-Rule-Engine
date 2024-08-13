
import test from 'ava'

import * as ruleMocks  from '@root/mocks/ruleMocks'

import { parseAndRun} from '../_testHelpers'

test('orRule', t => {
    var xml = ruleMocks.orRuleXml;    
    var result = parseAndRun(xml);
    t.true(result);
})

