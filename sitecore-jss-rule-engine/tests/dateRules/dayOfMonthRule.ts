
import test from 'ava'

import * as ruleMocks from '../../mocks/ruleMocks'

import { parseAndRunWithDateMock} from '../_testHelpers'

test('dayOfMonthRule', t => {
    var xml = ruleMocks.dayOfMonthRuleXml;

    var dateMock =  new Date(1989,0,5,0,0,0);
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.true(result);

    var dateMock =  new Date(1989,0,6,0,0,0);
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.false(result);
})