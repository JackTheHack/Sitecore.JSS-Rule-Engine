
import test from 'ava'

import * as ruleMocks from '@root/mocks/ruleMocks'

import { parseAndRunWithDateMock} from '../_testHelpers'

test('dayOfMonthRule', async t => {
    var xml = ruleMocks.dayOfMonthRuleXml;

    var dateMock =  new Date(1989,0,5,0,0,0);
    var result = await parseAndRunWithDateMock(xml, dateMock);
    t.true(result);

    var dateMock =  new Date(1989,0,6,0,0,0);
    var result = await parseAndRunWithDateMock(xml, dateMock);
    t.false(result);
})