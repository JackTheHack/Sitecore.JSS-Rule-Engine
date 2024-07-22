
import test from 'ava'

import * as ruleMocks  from '../../mocks/ruleMocks'

import { parseAndRun} from '../_testHelpers'

test('exceptTrueRule', t => {
    var xml = ruleMocks.exceptTrueRuleXml;
    var result = parseAndRun(xml);
    t.false(result);
})
