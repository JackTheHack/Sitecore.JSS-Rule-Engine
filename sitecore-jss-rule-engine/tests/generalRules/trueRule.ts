
import test from 'ava'

import * as ruleMocks  from '@root/mocks/ruleMocks'

import { parseAndRun} from '../_testHelpers'

test('trueRule', async t => {
    var xml = ruleMocks.trueRuleXml;
    var result = await parseAndRun(xml);
    t.true(result);
});