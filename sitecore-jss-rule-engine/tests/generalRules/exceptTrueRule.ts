
import test from 'ava'

import * as ruleMocks  from '@root/mocks/ruleMocks'

import { parseAndRun} from '../_testHelpers'

test('exceptTrueRule', async t => {
    var xml = ruleMocks.exceptTrueRuleXml;
    var result = await parseAndRun(xml);
    t.false(result);
})
