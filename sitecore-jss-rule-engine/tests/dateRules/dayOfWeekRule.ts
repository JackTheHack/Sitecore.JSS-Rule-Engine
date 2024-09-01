
import test from 'ava'

import * as ruleMocks from '@root/mocks/ruleMocks'

import { parseAndRunWithDateMock} from '../_testHelpers'

test('dayOfWeekRule', async t=> {
    var xml = ruleMocks.dayOfWeekRuleXml;

    var dateMock =  new Date(2023,7,12,0,0,0);    
    var result = await parseAndRunWithDateMock(xml, dateMock);
    t.true(result);

    var dateMock =  new Date(2023,7,13,0,0,0);    
    var result = await parseAndRunWithDateMock(xml, dateMock);
    t.true(result);

    var dateMock =  new Date(2023,7,14,0,0,0);    
    var result = await parseAndRunWithDateMock(xml, dateMock);
    t.false(result);
})