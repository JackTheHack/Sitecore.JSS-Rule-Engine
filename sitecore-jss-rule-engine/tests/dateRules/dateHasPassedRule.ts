
import test from 'ava'

import * as ruleMocks from '@root/mocks/ruleMocks'
import { parseAndRunWithDateMock} from '../_testHelpers'

// #region Rules Tests

test('dateHasPassedRule', t => {
    var xml = ruleMocks.dateHasPassedRuleXml;
    
    var dateMock =  new Date(1989,1,1,0,0,0);
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.false(result);

    var dateMock =  new Date(1991,1,1,0,0,0);
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.true(result);
})