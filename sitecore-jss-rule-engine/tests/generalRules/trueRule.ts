
import test from 'ava'

import * as ruleMocks  from '@root/mocks/ruleMocks'

import { parseAndRun} from '../_testHelpers'

test('trueRule', t => {
    var xml = ruleMocks.trueRuleXml;
    var result = parseAndRun(xml);
    t.true(result);
});