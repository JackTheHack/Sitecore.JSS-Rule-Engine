
import test from 'ava'

import * as ruleMocks  from '@root/mocks/ruleMocks'

import { parseAndRun} from '../_testHelpers'

test('andRule', async t => {
    var xml = ruleMocks.andRuleXml;
    var result = await parseAndRun(xml);
    t.false(result);
})
