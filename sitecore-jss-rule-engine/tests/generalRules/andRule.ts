
import test from 'ava'

import * as ruleMocks  from '../../mocks/ruleMocks'

import { parseAndRun} from '../_testHelpers'

test('andRule', t => {
    var xml = ruleMocks.andRuleXml;
    var result = parseAndRun(xml);
    t.false(result);
})
