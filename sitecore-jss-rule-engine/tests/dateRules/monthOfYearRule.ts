
import test from 'ava'

import * as ruleMocks from '@root/mocks/ruleMocks'

import { parseAndRunWithDateMock} from '../_testHelpers'

test('monthOfYearRule', async t=> {
    var dateMock =  new Date(1989,2,1,0,0,0);

    var xml = ruleMocks.monthOfYearRuleXml;
    
    var result = await parseAndRunWithDateMock(xml, dateMock);
    t.false(result);
})